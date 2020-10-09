import view from '../views/404.html'

export default () => {
    const divEl = document.createElement('div');
    divEl.innerHTML = view;

    return divEl;
}