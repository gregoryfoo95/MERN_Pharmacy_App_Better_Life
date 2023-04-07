import SidebarMenu from 'react-bootstrap-sidebar-menu';

export default function CustomSideBar({
  exclusiveExpand,
  collapseOnSelect,
  onSelect,
  themeName,
  isRtl,
  sideBarConfig,
}) {
  console.log('sideBarConfig=>', sideBarConfig);
  return (
    <SidebarMenu
      exclusiveExpand={exclusiveExpand}
      collapseOnSelect={collapseOnSelect}
      onSelect={onSelect}
      className={themeName}
      variant={"dark"}
      // bg={themeName}
      rtl={isRtl}
      expand="lg"
      hide="md">
      <SidebarMenu.Collapse>
        <SidebarMenu.Header>
          <SidebarMenu.Brand>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: 'inherit' }}>
              <img src="./images/UI/3.png" alt="BetterLife" className="logo" />
            </a>
          </SidebarMenu.Brand>
          <SidebarMenu.Toggle />
        </SidebarMenu.Header>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
            {sideBarConfig.map((item, i) => {
              return (
                <SidebarMenu.Nav.Link key={`sidebar_${i}`} eventKey={item.path}>
                  <SidebarMenu.Nav.Icon>
                    <i className={item.classData}></i>
                  </SidebarMenu.Nav.Icon>
                  <SidebarMenu.Nav.Title>{item.title}</SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              );
            })}
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
        <SidebarMenu.Footer></SidebarMenu.Footer>
      </SidebarMenu.Collapse>
    </SidebarMenu>
  );
}
