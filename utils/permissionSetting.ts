
export const Subjects = {
  order: "order",
  orderStatus: "orderStatus",
  orderHistory: "orderHistory",
  orders: "orders",

  menu: "menu",
  menus: "menus",

  users: "users",
  user: "user",

  role: "role",
  roles: "roles",

  topping: "topping",
  toppings: "toppings",
} as const;

export const Actions = {
  create: "create",
  read: "read",
  update: "update",
  delete: "delete",
};

export const RestaurantPermissions = [
  // Actions for 'order'
  { action: Actions.read, subject: Subjects.order },
  { action: Actions.read, subject: Subjects.orders },

  // Actions for 'orderStatus'
  { action: Actions.update, subject: Subjects.orderStatus },

  // Actions for 'menu'
  { action: Actions.create, subject: Subjects.menu },
  { action: Actions.read, subject: Subjects.menu },
  { action: Actions.update, subject: Subjects.menu },

  // Actions for 'user'
  { action: Actions.read, subject: Subjects.users },
  { action: Actions.create, subject: Subjects.user },
  { action: Actions.delete, subject: Subjects.user },

  // Actions for 'role'
  { action: Actions.create, subject: Subjects.role },
  { action: Actions.update, subject: Subjects.role },
  { action: Actions.delete, subject: Subjects.role },
  { action: Actions.read, subject: Subjects.roles },
];
