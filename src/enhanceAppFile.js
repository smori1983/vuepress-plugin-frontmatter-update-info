import FrontmatterUpdateInfoDebug from './components/FrontmatterUpdateInfoDebug';
import FrontmatterUpdateInfoList from './components/FrontmatterUpdateInfoList';
import FrontmatterUpdateInfoTable from './components/FrontmatterUpdateInfoTable';
import FrontmatterUpdateInfoPageEmbed from './components/FrontmatterUpdateInfoPageEmbed';

export default ({Vue}) => {
  Vue.component('PluginFrontmatterUpdateInfoDebug', FrontmatterUpdateInfoDebug);
  Vue.component('PluginFrontmatterUpdateInfoList', FrontmatterUpdateInfoList);
  Vue.component('PluginFrontmatterUpdateInfoTable', FrontmatterUpdateInfoTable);
  Vue.component('PluginFrontmatterUpdateInfoPageEmbed', FrontmatterUpdateInfoPageEmbed);
};
