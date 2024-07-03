using my.bookshop as my from '../db/data-model';

service CatalogService  {
    entity Invoice as projection on my.Invoice;

    function readInv(invoiceNo : String) returns LargeString;
}
