export const swaggerDarkThemeCss = `
  .swagger-ui { 
    background-color:rgb(36, 36, 36);
    color: #ffffff;
  }
  .swagger-ui .topbar { 
    background-color: #0c0c0c; 
  }
  
  /* API Title and description */
  .swagger-ui .info .title {
    color: #ffffff;
    font-size: 36px;
  }
  .swagger-ui .info .description,
  .swagger-ui .info p {
    color: #ffffff !important;
    font-size: 18px;
  }
  
  .swagger-ui .info h1,
  .swagger-ui .info h2,
  .swagger-ui .info h3,
  .swagger-ui .info h4,
  .swagger-ui .info h5,
  .swagger-ui a.nostyle,
  .swagger-ui .scheme-container .schemes>label {
    color: #ffffff;
  }
  
  /* Tag sections (auth, exercises, etc.) */
  .swagger-ui .opblock-tag {
    color: #ffffff;
    border-bottom: 1px solid #424242;
    font-size: 24px;
  }
  .swagger-ui .opblock-tag small {
    color: #ffffff !important; 
    font-weight: 400;
    font-size: 16px;
  }
  
  /* Operation blocks */
  .swagger-ui .opblock .opblock-summary-operation-id, 
  .swagger-ui .opblock .opblock-summary-path, 
  .swagger-ui .opblock .opblock-summary-path__deprecated, 
  .swagger-ui .opblock .opblock-summary-description {
    color: #ffffff;
  }
  .swagger-ui .opblock .opblock-section-header {
    background: #333333;
  }
  
  /* Parameters section */
  .swagger-ui .parameters-container .parameters-col_description {
    color: #ffffff;
  }
  .swagger-ui .parameters-container .parameters-col_name {
    color: #ffffff;
  }
  .swagger-ui .parameters-container .parameter__name {
    color: #ffffff;
    font-weight: bold;
  }
  .swagger-ui .parameters-container .parameter__type {
    color: #cccccc;
  }
  .swagger-ui .parameters-container .parameter__in {
    color: #bbbbbb;
  }
  .swagger-ui .parameters-container th {
    color: #ffffff;
    border-bottom: 1px solid #555555;
  }
  
  /* Parameters section heading */
  .swagger-ui .opblock-section-header h4 {
    color: #ffffff !important;
    font-weight: bold;
  }
  
  /* Parameter row backgrounds */
  .swagger-ui tr.parameters {
    background-color: #303030;
  }
  .swagger-ui tr.parameters:nth-of-type(2n) {
    background-color: #2a2a2a;
  }
  
  /* Improved contrast for operation blocks */
  .swagger-ui .opblock.opblock-get {
    background: rgba(97, 175, 254, 0.2);
    border-color: #61affe;
  }
  .swagger-ui .opblock.opblock-post {
    background: rgba(73, 204, 144, 0.2);
    border-color: #49cc90;
  }
  .swagger-ui .opblock.opblock-put {
    background: rgba(252, 161, 48, 0.2);
    border-color: #fca130;
  }
  .swagger-ui .opblock.opblock-delete {
    background: rgba(249, 62, 62, 0.2);
    border-color: #f93e3e;
  }
  .swagger-ui .opblock.opblock-patch {
    background: rgba(80, 227, 194, 0.2);
    border-color: #50e3c2;
  }
  
  /* Method buttons */
  .swagger-ui .opblock .opblock-summary-method {
    font-weight: bold;
    text-shadow: 0 1px 0 rgba(0,0,0,0.5);
  }
  
  /* Button styling */
  .swagger-ui .btn {
    color: #ffffff;
    background-color: #333333;
    border: 1px solid #555555;
  }
  .swagger-ui .btn:hover {
    background-color: #444444;
  }
  .swagger-ui .btn.authorize {
    background-color: #095b20;
    border-color: #095b20;
  }
  .swagger-ui .btn.authorize svg {
    fill: #ffffff;
  }
  
  /* Try it out button */
  .swagger-ui .try-out__btn {
    background-color: #4c4c4c;
    border-color: #555555;
  }
  .swagger-ui .try-out__btn:hover {
    background-color: #555555;
  }
  
  /* Form elements */
  .swagger-ui select {
    background: #303030;
    color: #ffffff;
    border-color: #555555;
  }
  .swagger-ui textarea,
  .swagger-ui input[type=text] {
    background-color: #262626;
    color: #ffffff;
    border-color: #555555;
  }
  
  /* Table elements */
  .swagger-ui .parameter__name,
  .swagger-ui .parameter__type,
  .swagger-ui table thead tr th,
  .swagger-ui .response-col_status,
  .swagger-ui .response-col_description,
  .swagger-ui .opblock-description-wrapper p,
  .swagger-ui .opblock-external-docs-wrapper p {
    color: #ffffff;
  }
  .swagger-ui table {
    background-color: #262626;
  }
  
  /* Model section styling */
  .swagger-ui .model {
    color: #ffffff;
  }
  .swagger-ui .model-title {
    color: #ffffff;
  }
  .swagger-ui .model-box {
    background-color: #303030;
  }
  .swagger-ui .model .property {
    color: #ffffff;
  }
  .swagger-ui section.models {
    border-color: #424242;
  }
  .swagger-ui section.models h4 {
    color: #ffffff;
  }
  .swagger-ui section.models .model-container {
    background-color: #262626;
  }
  .swagger-ui .scheme-container {
    background-color: #262626;
  }
  .swagger-ui .servers-title {
    color: #ffffff;
  }
  .swagger-ui .servers>label {
    color: #ffffff;
  }
  .swagger-ui .servers>label select {
    background-color: #303030;
    color: #ffffff;
  }
  
  /* Accordion toggle color */
  .swagger-ui .expand-methods svg, 
  .swagger-ui .expand-operation svg {
    fill: #ffffff;
  }
  
  /* Response codes */
  .swagger-ui .response-control {
    color: #ffffff;
  }
  .swagger-ui .responses-inner h4,
  .swagger-ui .responses-inner h5 {
    color: #ffffff;
  }
  
  /* Code blocks */
  .swagger-ui .highlight-code {
    background-color: #262626;
  }
  .swagger-ui .highlight-code .token.string {
    color: #9ccc65;
  }
  .swagger-ui .highlight-code .token.number {
    color: #f77669;
  }
  .swagger-ui .highlight-code .token.boolean {
    color: #7c7cff;
  }
`;

export const swaggerOptions = {
  deepLinking: true,
  displayRequestDuration: true,
  defaultModelsExpandDepth: -1, // Hide schema by default
  docExpansion: 'list', // Show operations by default but not expanded
};