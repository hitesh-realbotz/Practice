export const CONSTANTS = {
  //Action
  ADD_ACTION: 'Registration',
  UPDATE_ACTION: 'Update',
  EDIT_ACTION: 'Edit',
  DELETE_ACTION: 'Delete',

  //Entities
  FOR_STUDENT: 'Student',
  FOR_PROJECT: 'Project',

  //RemoteDB folder
  STUDENT_REMOTE_FOLDER: 'students',
  PROJECT_REMOTE_FOLDER: 'projects',
  STANDARD_REMOTE_FOLDER: 'standard',
  
  STORED_ROUTE_KEY_NAME: 'CurrentRoute',

  //Button
  SUBMIT_BUTTON_TEXT: 'SUBMIT',
  RESET_BUTTON_TEXT: 'RESET',
  UPDATE_BUTTON_TEXT: 'UPDATE',
  DELET_BUTTON_TEXT: 'DELETE',

  //ErrorTag
  PROJECT_TITLE_ERROR_TAG: 'titleError',
  STATUS_ERROR_TAG: 'statusError',
  DESCRIPTION_ERROR_TAG: 'descriptionError',
  START_DATE_ERROR_TAG: 'startDateError',
  END_DATE_ERROR_TAG: 'endDateError',

  DOB_DATE_ERROR_TAG: 'dobError',
  NAME_ERROR_TAG: 'nameError',
  EMAIL_ERROR_TAG: 'emailError',
  STANDARD_ERROR_TAG: 'standardError',
  DIVISION_ERROR_TAG: 'divisionError',
  ROLL_NO_ERROR_TAG: 'rollNoError',
  SUBJECT_ERROR_TAG: 'subjectError',


  //ErrorMessage
  PROJECT_TITLE_ASSIGNED: 'Project Title is already assigned!',
  EMAIL_ASSIGNED: 'Email is already assigned!',
  ROLL_NO_ASSIGNED: 'Roll No. is already assigned!',
  INVALID_STUDENT_EMAIL: 'Invalid Student email-id!',
  INVALID_STUDENT_NAME: 'Invalid Student name!',
  INVALID_START_DATE_RELATION: 'Start date should not be greater than end date!',
  INVALID_END_DATE_RELATION: 'End date should not be less than start date!',

  //Range
  MIN_STANDARDS: 1,
  MAX_STANDARD: 10,
  MAX_DIVISION: 4,
  MAX_ROLLNO: 30,

  //Otions
  FAV_SUBJECT1: 'Math',
  FAV_SUBJECT2: 'Science',
  FAV_SUBJECT3: 'English',

  PROJECT_ONGOING_STATUS: 'Ongoing',
  PROJECT_HOLD_STATUS: 'Hold',
  PROJECT_COMPLETE_STATUS: 'Complete',

  // PROJECT_STATUS_OPTIONS: [
  //   { value: 'Ongoing', label: 'Ongoing' },
  //   { value: 'Hold', label: 'Hold' },
  //   { value: 'Complete', label: 'Complete' },
  // ],


  //Regex
  REGEX_EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  REGEX_DATE: /^\d{4}-\d{2}-\d{2}$/,



};
