import 'animate.css';

export const uiConstants = {
  swalAnimation:  {
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
  }
}

export const dataTableSettings = {
  lengthMenu: [
    [5, 10, 20, -1],
    [5, 10, 20, 'All'],
  ],
  language: {
    paginate: {
      // previous: "<span class='btn pagination-button'>Précédent</span>",
      // next: "<span class='btn pagination-button'>Suivant</span>"
      first: "",
      last: "",
      previous: "Précédent",
      next: "Suivant"
    },
    search: '<i class="fas fa-search"></i>',
    searchPlaceholder: "          Rechercher",
    lengthMenu: "Affichage de _MENU_ entrées par page",
    zeroRecords: "Aucun enregistrement",
    info: "Page _PAGE_ sur _PAGES_ pages",
    infoEmpty: "Aucun Enregistrement Trouvé",
  }
};
