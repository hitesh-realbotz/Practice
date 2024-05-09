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
  
  
  //Route Path
  HOME_ROUTE_PATH: '/',
  SIGN_UP_ROUTE_PATH: '/sign-up',
  STUDENTS_ROUTE_PATH: '/students',
  PROJECTS_ROUTE_PATH: '/projects',
  DASHBOARD_ROUTE_PATH: '/dashboard',
  
  //SessionStored Current Route Path Key
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

  DOBC_DATE_ERROR_TAG: 'dobcError',
  DOB_DATE_ERROR_TAG: 'dobError',
  NAME_ERROR_TAG: 'nameError',
  EMAIL_ERROR_TAG: 'emailError',
  STANDARD_ERROR_TAG: 'standardError',
  DIVISION_ERROR_TAG: 'divisionError',
  ROLL_NO_ERROR_TAG: 'rollNoError',
  SUBJECT_ERROR_TAG: 'subjectError',


  //ErrorMessage
  PROJECT_ASSIGNED_TO_EMAIL: 'Project is already assigned!',
  PROJECT_TITLE_ASSIGNED: 'Project Title is already assigned!',
  EMAIL_ASSIGNED: 'Email is already assigned!',
  ROLL_NO_ASSIGNED: 'Roll No. is already assigned!',
  DIVISION_FULL: 'Division is full!',
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

  ICON_COLOR_WHITE: 'white',
  ICON_COLOR_BLACK: 'black',

  SORT_ORDER_ASC: 'Ascending',
  SORT_ORDER_DESC: 'Descending',

  SORT_BY_STANDARD_LABEL: 'Standard',
  SORT_BY_STANDARD: 'standard',
  SORT_BY_DIVISION_LABEL: 'Division',
  SORT_BY_DIVISION: 'division',
  SORT_BY_NAME_LABEL: 'Name',
  SORT_BY_NAME: 'name',
  SORT_BY_EMAIL_LABEL: 'Email',
  SORT_BY_EMAIL: 'email',
  SORT_BY_DOB_LABEL: 'DOB',
  SORT_BY_DOB: 'dob',
  SORT_BY_SUBJECT_LABEL: 'Subject',
  SORT_BY_SUBJECT: 'subject',
  
  SORT_BY_TITLE_LABEL: 'Title',
  SORT_BY_TITLE: 'title',
  SORT_BY_STATUS_LABEL: 'Status',
  SORT_BY_STATUS: 'status',
  SORT_BY_START_DATE_LABEL: 'Start Date',
  SORT_BY_START_DATE: 'startDate',
  SORT_BY_END_DATE_LABEL: 'End Date',
  SORT_BY_END_DATE: 'endDate',

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
