using CatalogService as service from '../../srv/cat-service';
annotate service.Invoice with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'invoiceNumber',
                Value : invoiceNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'customerNumber',
                Value : customerNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'fiscalYear',
                Value : fiscalYear,
            },
            {
                $Type : 'UI.DataField',
                Label : 'totalAmount',
                Value : totalAmount,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Invoice Number',
            Value : invoiceNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Fiscal Year',
            Value : fiscalYear,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Customer Number',
            Value : customerNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Total Amount',
            Value : totalAmount,
        },
    ],
);

// annotate service.Invoice with @UI.DeleteHidden : true;

annotate service.Invoice with @(
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : invoiceNumber,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #CP,
                            Low : '',
                        },
                    ],
                },],
        },
    }
);
annotate service.Invoice with @(
    UI.SelectionPresentationVariant #table1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
