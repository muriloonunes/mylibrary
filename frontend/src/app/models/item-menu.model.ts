interface MenuItem {
  label: string;
  icon: string;
  rota: string;
  queryParams?: any;
  aberto?: boolean;
  filhos?: MenuItem[];
}
