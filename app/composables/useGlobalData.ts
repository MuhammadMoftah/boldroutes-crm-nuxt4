export const useGlobalData = () => {
  return reactive({
    days: [
      { name: "السبت", id: "1" },
      { name: "الاحد", id: "2" },
      { name: "الاثنين", id: "3" },
      { name: "الثلاثاء", id: "4" },
      { name: "الاربعاء", id: "5" },
      { name: "الخميس", id: "6" },
      { name: "الجمعة", id: "7" },
    ],
    results: [
      "etkan_elhefz",
      "dabt_eltashabohat",
      "elosool",
      "elkersh",
      "estehdar_elshwaheed",
      "estzhar_eltagweed",
      "makhareg_elhoroof",
      "ahkaam_elnoon_elmeem",
      "ahkaam_elmadod",
      "eltaf5eem_eltarkeek",
      "etmam_elharakat",
      "dabt_elnafas",
      "elnabr_elestefham",
      "elwokoof_elebtedaa",
    ],
  });
};
