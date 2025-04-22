export class Job {
    constructor(id, titulo, descripcion, salario, ubicacion, tipoTrabajo, modalidad, vencimiento, empresa) {
      this._id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.salario = salario;
      this.ubicacion = ubicacion;
      this.tipoTrabajo = tipoTrabajo;
      this.modalidad = modalidad;
      this.vencimiento = vencimiento;
      this.empresa = empresa;
  }
}

