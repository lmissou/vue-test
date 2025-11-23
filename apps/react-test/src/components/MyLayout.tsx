import { useState, type PropsWithChildren } from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import { router, type RouteObjectWithMeta } from '@/router';

const { Header, Sider, Content } = Layout;

type MyLayoutProps = PropsWithChildren;

function MyLayout(props: MyLayoutProps) {
  const routes: RouteObjectWithMeta[] = router.routes;
  const [menuItems] = useState<MenuProps['items']>(() =>
    routes
      .filter((item) => item.path !== '/')
      .map((item) => ({
        key: item.path ?? '',
        label: item.meta?.title ?? item.id,
      }))
  );
  function handleClickMenu(info: { key: string }) {
    router.navigate(info.key);
  }
  return (
    <Layout>
      <Header className="bg-white! border-b border-gray-200">Header</Header>
      <Layout>
        <Sider className="bg-white!">
          <Menu items={menuItems} onClick={handleClickMenu} />
        </Sider>
        <Content className="flex flex-col">
          <div className="flex flex-col flex-1 overflow-auto m-2.5 bg-white">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyLayout;
