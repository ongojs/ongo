module.exports = (data = {}) => `body {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100% !important;
    -ms-text-size-adjust: 100% !important;
    -webkit-font-smoothing: antialiased !important;
  }
  img {
    border: 0 !important;
    outline: none !important;
  }
  p {
    Margin: 0px !important;
    Padding: 0px !important;
  }
  table {
    border-collapse: collapse;
    mso-table-lspace: 0px;
    mso-table-rspace: 0px;
  }
  td, a, span {
    border-collapse: collapse;
    mso-line-height-rule: exactly;
  }
  .ExternalClass * {
    line-height: 100%;
  }
  .em_blue a {text-decoration:none; color:#264780;}
  .em_grey a {text-decoration:none; color:#434343;}
  .em_white a {text-decoration:none; color:#ffffff;}
  
  @media only screen and (min-width:481px) and (max-width:649px) {
  .em_main_table {width: 100% !important;}
  .em_wrapper{width: 100% !important;}
  .em_hide{display:none !important;}
  .em_aside10{padding:0px 10px !important;}
  .em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
  .em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
  .em_aside5{padding:0px 10px !important;}
  .em_ptop2 { padding-top:8px !important; }
  }
  @media only screen and (min-width:375px) and (max-width:480px) {
  .em_main_table {width: 100% !important;}
  .em_wrapper{width: 100% !important;}
  .em_hide{display:none !important;}
  .em_aside10{padding:0px 10px !important;}
  .em_aside5{padding:0px 8px !important;}
  .em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
  .em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
  .em_font_11 {font-size: 12px !important;}
  .em_font_22 {font-size: 22px !important; line-height:25px !important;}
  .em_w5 { width:7px !important; }
  .em_w150 { width:150px !important; height:auto !important; }
  .em_ptop2 { padding-top:8px !important; }
  u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}
  }
  @media only screen and (max-width:374px) {
  .em_main_table {width: 100% !important;}
  .em_wrapper{width: 100% !important;}
  .em_hide{display:none !important;}
  .em_aside10{padding:0px 10px !important;}
  .em_aside5{padding:0px 8px !important;}
  .em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
  .em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
  .em_font_11 {font-size: 11px !important;}
  .em_font_22 {font-size: 22px !important; line-height:25px !important;}
  .em_w5 { width:5px !important; }
  .em_w150 { width:150px !important; height:auto !important; }
  .em_ptop2 { padding-top:8px !important; }
  u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}
  }`