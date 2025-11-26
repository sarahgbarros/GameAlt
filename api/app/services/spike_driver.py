import asyncio
import logging
from typing import Optional, Callable

from bleak import BleakScanner, BleakClient
from bleak.backends.characteristic import BleakGATTCharacteristic

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("spike-ble")


class SpikeBLEConnection:
    def __init__(self):
        self.client: Optional[BleakClient] = None
        self.mac: Optional[str] = None
        self.tx_uuid: Optional[str] = None
        self.rx_uuid: Optional[str] = None
        self.service_uuid: Optional[str] = None
        self._notify_callback: Optional[Callable[[bytes], None]] = None

    async def discover_prime(self, timeout=5):
        devices = await BleakScanner.discover(timeout=timeout)
        for d in devices:
            if d.name and "prime" in d.name.lower():
                return d.address
        return None

    async def _get_services_universal(self):
        """
        Tenta todas as formas possíveis de pegar serviços,
        compatível com todas versões do Bleak.
        """
        # 1) Versões novas: client.get_services() async
        try:
            svcs = await self.client.get_services()
            return svcs
        except Exception:
            pass

        # 2) Versões antigas: client.services já preenchido
        try:
            if hasattr(self.client, "services") and self.client.services is not None:
                return self.client.services
        except Exception:
            pass

        # 3) Versões bem antigas (fallback): get_services() síncrono
        try:
            svcs = self.client.services
            return svcs
        except Exception:
            pass

        raise RuntimeError("Nenhuma API de serviços disponível nesta versão do Bleak.")

    async def _auto_detect_characteristics(self):
        assert self.client and self.client.is_connected

        svcs = await self._get_services_universal()

        log.info("Listando serviços/characterísticas:")
        for s in svcs:
            log.info(f"SERVICE {s.uuid}")
            for c in s.characteristics:
                log.info(f"  CHAR {c.uuid} props={c.properties}")

        # ---------
        # PROCURAR WRITE
        # ---------
        for s in svcs:
            for c in s.characteristics:
                props = [p.lower() for p in c.properties]
                if ("write-without-response" in props or "write" in props) and not self.tx_uuid:
                    self.tx_uuid = c.uuid

        # ---------
        # PROCURAR NOTIFY
        # ---------
        for s in svcs:
            for c in s.characteristics:
                props = [p.lower() for p in c.properties]
                if "notify" in props and not self.rx_uuid:
                    self.rx_uuid = c.uuid

        if not self.tx_uuid or not self.rx_uuid:
            raise RuntimeError("Não foi possível encontrar características TX/RX no Spike.")

    async def connect(self, mac: str, notify_callback: Optional[Callable[[bytes], None]] = None):
        self.client = BleakClient(mac)
        self.mac = mac
        self._notify_callback = notify_callback

        await self.client.connect()

        if not self.client.is_connected:
            raise RuntimeError("Falha ao conectar")

        await self._auto_detect_characteristics()

        if self.rx_uuid:
            async def _internal_notify(_: BleakGATTCharacteristic, data: bytearray):
                if self._notify_callback:
                    self._notify_callback(bytes(data))

            try:
                await self.client.start_notify(self.rx_uuid, _internal_notify)
            except Exception as e:
                log.error(f"Erro start_notify: {e}")

        return True

    async def send(self, data: bytes):
        if not self.client or not self.client.is_connected:
            raise RuntimeError("Não conectado")

        try:
            await self.client.write_gatt_char(self.tx_uuid, data, response=False)
        except Exception:
            await self.client.write_gatt_char(self.tx_uuid, data, response=True)

    async def read(self):
        if not self.client or not self.client.is_connected:
            raise RuntimeError("Não conectado")
        return await self.client.read_gatt_char(self.rx_uuid)

    async def disconnect(self):
        if not self.client:
            return
        try:
            if self.client.is_connected:
                await self.client.disconnect()
        finally:
            self.client = None
            self.mac = None
            self.tx_uuid = None
            self.rx_uuid = None
            self.service_uuid = None
            self._notify_callback = None

    def is_connected(self):
        return bool(self.client and self.client.is_connected)
