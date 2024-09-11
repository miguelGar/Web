import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
  producto: Producto = new Producto();
  id: number;

  constructor(private productoServicio: ProductoService, 
    private ruta: ActivatedRoute,
    private erutador: Router) { }

    ngOnInit(){
      this.id = this.ruta.snapshot.params['id'];
      this.productoServicio.obtenerProductoId(this.id).subscribe(
        {
          next: (datos) => this.producto = datos,

          error: (error: any) => console.log(error)
        }
      );
    }

    submit(){
      this.guardarProducto();
    }

    guardarProducto(){
      this.productoServicio.editarProducto(this.id, this.producto ).subscribe(
        {
          next: (datos) => this.productoLista(),
          error: (error) => console.log(error)
        }
      )
    }

    productoLista(){
      this.erutador.navigate(['/productos'])
    }

}
