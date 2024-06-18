class Task {
    constructor( title, description, status, dueDate, id=null) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = status;
      this.dueDate = dueDate;
    }
    
  }
  
  module.exports = Task;