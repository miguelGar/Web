import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  producto: Producto = new Producto();

  constructor(private ProductoService: ProductoService, private enrutador: Router){  
  }

  submit() {
    this.guardarProducto();
  }

  guardarProducto(){
    this.ProductoService.agregarProductos(this.producto).subscribe(
      {
        next: (datos) => {
          this.listaProductos();

        },
        error: (error: any) => {console.log(error)}
      }
    );
  }

  listaProductos(){
    this.enrutador.navigate(['/productos']);
  }

}
