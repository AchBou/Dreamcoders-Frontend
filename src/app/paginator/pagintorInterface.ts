import {MatPaginatorIntl} from '@angular/material';
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items par page:';
  nextPageLabel     = 'Suivant';
  previousPageLabel = 'Précedent';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 od ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' sur ' + length;
  };

}
