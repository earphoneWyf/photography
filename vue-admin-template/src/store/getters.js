const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.admin.token,
  avatar: state => state.admin.avatar,
  name: state => state.admin.name,
  id: state => state.admin.id,
  password: state => state.admin.password,
  users: state => state.user.users,
  carousels: state => state.carousel.carousels,
  informations: state => state.information.informations
}
export default getters
