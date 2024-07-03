namespace my.bookshop;

entity Invoice {
  key invoiceNumber : String;
  customerNumber : String;
  fiscalYear  : String;
  totalAmount  : String;
}

entity pdfcontain {
  pdfdata : LargeString;
}
