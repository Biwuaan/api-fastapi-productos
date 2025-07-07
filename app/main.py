from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import json
import os

app = FastAPI()

class Producto(BaseModel):
    id: int
    nombre: str
    descripcion: str
    precio: float

if not os.path.exists("base_datos"):
    os.makedirs("base_datos")

FILE_PATH = "base_datos/productos.json"

def cargar_productos() -> List[dict]:
    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    else:
        with open(FILE_PATH, "w", encoding="utf-8") as f:
            json.dump([], f, indent=4)
        return []
    
def guardar_productos(productos: List[dict]) -> None:
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(productos, f, indent=4)

@app.get("/productos", response_model=List[Producto])
def obtener_producto():
    return cargar_productos()