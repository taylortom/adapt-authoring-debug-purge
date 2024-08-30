import { AbstractModule } from 'adapt-authoring-core';
/**
* Adds a nuclear purge function
* @extends purge
* @extends {AbstractModule}
*/
class DebugPurgeModule extends AbstractModule {
  /** @override */
  async init() {
    const [auth, content, ui] = await this.app.waitForModule('auth', 'content', 'ui');
    ui.addUiPlugin(`${this.rootDir}/ui-plugins`);
    
    content.router.addRoute({
      route: '/purge',
      handlers: { post: this.handlePurge.bind(this) }
    });
    auth.secureRoute(`${content.router.path}/purge`, 'POST', ['debug'])
  }
  
  async handlePurge(req, res, next) {
    try {
      const [assets, content, contentplugin, framework] = await this.app.waitForModule('assets', 'content', 'contentplugin', 'adaptframework');
      // content
      await content.deleteMany()
      // assets
      const allAssets = await assets.find();
      await Promise.all(allAssets.map(a => assets.delete(a)));
      // contentplugins
      const plugins = await contentplugin.find({ includeUpdateInfo: false });
      await Promise.all(plugins.map(p => contentplugin.delete(p)));
      // reinstall framework
      await framework.installFramework(`v${framework.version}`, true);
    } catch(e) {
      next(e);
    }
  }
}

export default DebugPurgeModule;