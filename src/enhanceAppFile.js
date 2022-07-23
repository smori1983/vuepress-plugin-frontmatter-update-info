import FrontmatterUpdateInfoDebug from './components/FrontmatterUpdateInfoDebug';
import FrontmatterUpdateInfoList from './components/FrontmatterUpdateInfoList';

export default ({Vue}) => {
  Vue.component('PluginFrontmatterUpdateInfoDebug', FrontmatterUpdateInfoDebug);
  Vue.component('PluginFrontmatterUpdateInfoList', FrontmatterUpdateInfoList);
};
