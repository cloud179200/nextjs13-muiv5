"use client"
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { IListMenu } from '../../../../../config/menu-items/index';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //
interface IProps {
    item: IListMenu
}
const NavGroup = ({ item }: IProps) => {
    const theme: any = useTheme();

    // menu list collapse & items
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider
            <Divider sx={{ mt: 0.25, mb: 1.25 }} /> */}
        </>
    );
};

export default NavGroup;