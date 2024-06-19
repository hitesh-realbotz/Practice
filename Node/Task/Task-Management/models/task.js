class Task {
    constructor( title, description, status, dueDate, createdBy, createdDate, id=null) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = status;
      this.dueDate = dueDate;
      this.createdBy = createdBy;
      this.createdDate = createdDate;
    } 
  }
  
  module.exports = Task;