import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent {
  faTrash = faTrash;
  productos: Producto[];

  constructor(private productoServicio: ProductoService,
              private enrutador:Router){}

  ngOnInit(){
    // cargar los productos
    this.obtenerProductos();
  }

  private obtenerProductos(){
    // Consumir los datos del observable (suscribirnos)
    this.productoServicio.obtenerProductosLista().subscribe(

          (datos => {
            this.productos = datos;
            console.log(datos)
          })
    );
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id]);
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos(),
        error: (error) => console.log(error)
      }
    );
  }

}
