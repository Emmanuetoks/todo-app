const ContainerHeader = () => {
  const changeTheme = () => {
    const body = document.querySelector('body');
    const currentTheme = body.className;
    if (currentTheme === 'theme-1') {
      body.className = 'theme-2';
    } else if (currentTheme === 'theme-2') {
      body.className = 'theme-1';
    }
    
  }
  return (
    <header className="container__header flex">
      <h1 className="uppercase container__logo fw-700">todo</h1>
      <button onClick={changeTheme} className="container__theme-btn">
        <span className="sr-only">Theme-toggler</span>
      </button>
    </header>
  )
}

export default ContainerHeader