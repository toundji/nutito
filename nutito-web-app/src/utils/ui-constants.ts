export const  swalAnimation: any =  {
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
}

export const swalDeleteConfirm: any = {
  title: 'Êtes vous sûr ?',
  text: "Voulez-vous vraiment procéder à la suppression de cette donnée ?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: "Annuler",
  confirmButtonText: "Supprimer l'élément",
  ...swalAnimation
}

export const swalSuccess: any = {
  title: "Succès de l'opération",
  text: "Donnée enregistrée avec succès",
  icon: "success",
  ...swalAnimation
}

export const swalError: any = {
  title: "Erreur",
  text: "Une erreur est survenue lors de l'enregistrement de la donnée",
  icon: "success",
  ...swalAnimation
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
