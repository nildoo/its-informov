import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import JobDetails from '../Screens/Tabs/JobDetails';
import Files from '../Screens/Tabs/Files';
import MostStack from '../Stacks/MoreStack';
import Report from '../Stacks/Reports';
import Team from '../Screens/Tabs/Team';

import Helmet from '../Assets/Img/helmet.svg';
import Folder from '../Assets/Img/folder.svg';
import IconMost from '../Assets/Img/menu-hamburguer.svg';
import IconTeam from '../Assets/Img/team.svg';
import IconReport from '../Assets/Img/report.svg';

import Colors from '../Colors';
import { useLanguage } from '../hooks/useLanguage'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const { language } = useLanguage()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'JobDetails') {
            return <Helmet style={{ color: color }} />
          } else if (route.name === 'Files') {
            return <Folder style={{ color: color }} />
          } else if (route.name === 'Report') {
            return <IconReport style={{ color: color }} />
          } else if (route.name === 'Team') {
            return <IconTeam style={{ color: color }} />
          } else if (route.name === 'MostStack') {
            return <IconMost style={{ color: color }} />
          }
        },
        tabBarActiveTintColor: Colors.blueLight,
        tabBarInactiveTintColor: Colors.iconTab,
        tabBarLabelStyle: {
          lineHeight: 14,
          fontFamily: 'Poppins Regular',
        },
        //Colocar uma borda em cima do ícone, somente no selecionado
        tabBarItemStyle: {
          borderTopColor: Colors.blueLight,
          marginHorizontal: 8,
        },
      })}>
      <Tab.Screen
        options={{
          headerShown: false,
          title: language === 'portuguese' ? 'Detalhes' : 'Details',
        }}
        name="JobDetails"
        component={JobDetails}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: language === 'portuguese' ? 'Arquivos' : 'Files',
        }}
        name="Files"
        component={Files}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: language === 'portuguese' ? 'Relatórios' : 'Reports',
        }}
        name="Report"
        initialParams={{ defaultRoute: 'Index', initialRoute: null }}
        component={Report}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: language === 'portuguese' ? 'Equipe' : 'Team',
        }}
        name="Team"
        component={Team}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: language === 'portuguese' ? 'Mais' : 'More',
          tabBarBadge: '',
        }}
        name="MostStack"
        component={MostStack}
      />
    </Tab.Navigator>
  )
}

export default Tabs;

