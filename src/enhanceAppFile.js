import FrontmatterUpdateInfoDebug from './components/FrontmatterUpdateInfoDebug';
import FrontmatterUpdateInfoList from './components/FrontmatterUpdateInfoList';
import FrontmatterUpdateInfoTable from './components/FrontmatterUpdateInfoTable';

export default ({Vue}) => {
  Vue.component('PluginFrontmatterUpdateInfoDebug', FrontmatterUpdateInfoDebug);
  Vue.component('PluginFrontmatterUpdateInfoList', FrontmatterUpdateInfoList);
  Vue.component('PluginFrontmatterUpdateInfoTable', FrontmatterUpdateInfoTable);
};
