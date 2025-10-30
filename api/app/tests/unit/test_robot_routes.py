import pytest
from fastapi.testclient import TestClient
from fastapi import WebSocket
from unittest.mock import patch, MagicMock
from ...routes.robot_routes import router
from ...services.robot_service import robot_service

from fastapi import FastAPI

app = FastAPI()
app.include_router(router)

@pytest.fixture
def client():
    return TestClient(app)

def test_connect_robot_success(client):
    with patch.object(robot_service, "connect", return_value=True):
        response = client.post("/connect")
        assert response.status_code == 200
        assert response.json()["status"] == "connected"

def test_connect_robot_failure(client):
    with patch.object(robot_service, "connect", return_value=False):
        response = client.post("/connect")
        assert response.status_code == 500

def test_execute_commands_success(client):
    with patch.object(robot_service, "connected", True), \
            patch.object(robot_service, "execute_commands", return_value=True):
        response = client.post("/execute", json={"commands": ["forward", "left"]})
        assert response.status_code == 200
        assert response.json()["status"] == "success"

def test_execute_commands_empty(client):
    response = client.post("/execute", json={"commands": []})
    assert response.status_code == 400

def test_execute_commands_not_connected(client):
    with patch.object(robot_service, "connected", False):
        response = client.post("/execute", json={"commands": ["forward"]})
        assert response.status_code == 400

def test_execute_commands_invalid_command(client):
    with patch.object(robot_service, "connected", True):
        response = client.post("/execute", json={"commands": ["jump"]})
        assert response.status_code == 400
        assert "Invalid commands" in response.json()["detail"]

def test_execute_commands_failure(client):
    with patch.object(robot_service, "connected", True), \
            patch.object(robot_service, "execute_commands", return_value=False):
        response = client.post("/execute", json={"commands": ["forward"]})
        assert response.status_code == 500

def test_disconnect_robot_success(client):
    original = getattr(robot_service, "disconnect", None)
    robot_service.disconnect = lambda: True
    response = client.post("/disconnect")
    assert response.status_code == 200
    assert response.json()["status"] == "disconnected"
    if original:
        robot_service.disconnect = original
    else:
        delattr(robot_service, "disconnect")

def test_disconnect_robot_failure(client):
    original = getattr(robot_service, "disconnect", None)
    robot_service.disconnect = lambda: False
    response = client.post("/disconnect")
    assert response.status_code == 500
    if original:
        robot_service.disconnect = original
    else:
        delattr(robot_service, "disconnect")

def test_get_status(client):
    original = getattr(robot_service, "get_status", None)
    robot_service.get_status = lambda: {"connected": True}
    response = client.get("/status")
    assert response.status_code == 200
    assert response.json() == {"connected": True}
    if original:
        robot_service.get_status = original
    else:
        delattr(robot_service, "get_status")


def test_websocket_connection(client):
    with patch.object(robot_service, "connected", True), \
            patch.object(robot_service, "execute_commands", return_value=True):
        with client.websocket_connect("/ws") as websocket:
            data = websocket.receive_json()
            assert data["type"] == "connection"
            assert data["status"] == "connected"
            websocket.send_text("forward")
            result = websocket.receive_json()
            assert result["type"] == "success"
            assert result["command"] == "forward"

def test_websocket_invalid_command(client):
    with patch.object(robot_service, "connected", True):
        with client.websocket_connect("/ws") as websocket:
            websocket.receive_json()  
            websocket.send_text("invalidcmd")
            result = websocket.receive_json()
            assert result["type"] == "error"
            assert "Invalid command" in result["message"]

def test_websocket_robot_not_connected(client):
    with patch.object(robot_service, "connected", False):
        with client.websocket_connect("/ws") as websocket:
            websocket.receive_json()  
            websocket.send_text("forward")
            result = websocket.receive_json()
            assert result["type"] == "error"
            assert "Robot not connected" in result["message"]
