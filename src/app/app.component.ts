import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ExcelService } from './Services/excel.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private excelService: ExcelService,
    ){}

  private fotoSeleccionada: File;
  //Archivos excel con extensión .xlsx
  private valueFotoSeleccionadaXlsx4_1: String;
  //Archivos excel con extensión .xls
  private valueFotoSeleccionadaXls3_1: String;

  progreso: number = 0;

  title = 'excelfront';

  seleccionarFoto(event)
  {
    this.fotoSeleccionada = event.target.files[0];
    // cada vez q seleccionemos otra imagen debemos reiniciar el progreso
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
  /*  if(this.fotoSeleccionada.icon.indexOf('image') < 0)
    {
      Swal.fire('Error al seleccionar imagen:','El archivo debe ser de tipo imagen','error');
      this.fotoSeleccionada = null;
    }*/
    //var valueFotoSeleccionada = this.fotoSeleccionada.name
    //console.log(valueFotoSeleccionada.substring(valueFotoSeleccionada.length - 4))


  }

  //cambiar 32 por codigo eps
  subirFoto()
  {

    /*
    var valueFotoSeleccionadaXlsx4 = this.fotoSeleccionada.name
    console.log(valueFotoSeleccionadaXlsx4.substring(valueFotoSeleccionadaXlsx4.length - 4))
    //Para xlsx
    var valueFotoSeleccionadaXlsx4_1 = valueFotoSeleccionadaXlsx4.substring(valueFotoSeleccionadaXlsx4.length - 4)

    var valueFotoSeleccionadaXls3 = this.fotoSeleccionada.name.toString()
    console.log(valueFotoSeleccionadaXls3.substring(valueFotoSeleccionadaXls3.length - 3))
    //Para xlsx
    var valueFotoSeleccionadaXlsx3_1 = valueFotoSeleccionadaXls3.substring(valueFotoSeleccionadaXls3.length - 3)
    */
    if(!this.fotoSeleccionada)
    {
      Swal.fire('Error Upload:','Debe seleccionar un archivo','error');
    }
    //else if(valueFotoSeleccionadaXlsx4 == "xlsx" || valueFotoSeleccionadaXls3 == "xls")
    //{
     // Swal.fire('Error Upload:','Debe seleccionar un archivo de tipo Excel','error');
    //}
    else{
    this.excelService.subirArchivo(this.fotoSeleccionada,'2').subscribe(
        event=>{
       // this.medicamento = medicamento;
       // preguntamos si se est5a subiendo el archivo
       if(event.type === HttpEventType.UploadProgress)
       {// calculamos el progreso con la sgte formula
          this.progreso = Math.round((event.loaded / event.total) * 100);
       }
       else if(event.type === HttpEventType.Response)
       {
        let response:any = event.body;
        //his.medicamento =response.medicamento as Excel;
      //  this.modalService.notificarUpload.emit(this.medicamento);
        Swal.fire('La foto se ha cargado satisfactoriamente',response.mensaje,'success');
       }


      }
    )
  }
  }
}

