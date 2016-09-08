/**
 * Import / export plugin for theme configurations
 *
 * @category   Shopware
 * @package    Shopware\Plugins\SimklThemeSettingExport
 * @author     Simon Klimek <me@simonklimek.de>
 * @copyright  2015 Simon Klimek ( http://simonklimek.de )
 * @license    http://www.gnu.org/licenses/agpl-3.0.en.html GNU AFFERO GENERAL PUBLIC LICENSE
 */
//{namespace name=backend/theme/main}
//{block name="backend/theme/simkl_theme_setting_export/view/export/window"}
/**
 * window of the import / export ExtJS app
 */
Ext.define('Shopware.apps.Theme.skwdThemeSettingExport.view.export.Window', {
    extend: 'Enlight.app.Window',
    alias: 'widget.theme-export-window',
    title : '{s name=exportWindowTitle}Export / Import{/s}',
    width: 480,
    height: 305,
    layout:'fit',
    formPanel: null,
    modal: true,
    resizeable: false,
    minimizable: false,
    maximizable: false,

    theme: null,
    shop: null,

    initComponent: function() {
        var me = this;

        me.items = me.createItems();

        me.callParent(arguments);
    },

    /**
     * The main window contains one tab panel.
     * This will be created by this function
     * @return { [Ext.tab.Panel] }
     */
    createItems: function() {
        var me = this;
        return Ext.create('Ext.form.Panel', {
            bodyPadding: 20,
            layout: 'column',
            defaults: {
                bodyPadding: 4,
                columnWidth: 1,
            },
            items: [
                me.createImportFieldset(),
                me.createExportFieldset()
            ]
        });

    },

    /**
     * Creates the export form panel including a textarea which 
     * contains the export json string
     * @return { Ext.form.Panel }
     */
    createExportFieldset: function() {
        var me = this;

        return Ext.create('Ext.form.FieldSet', {
            title: 'Export',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'button',
                text: 'download',
                cls: 'primary',
                handler: function() {
                    var url = '{url controller="ThemeImportExport" action="export"}?theme=' + me.theme.getId() + '&shop=' + me.shop.getId();
                    window.open(url);
                }
            }]
        });
    },

    /**
     * Creates the import form panel. This includes a textarea
     * field to enter a json string and adds an import button
     * to the bottom bar
     * @return { Ext.form.Panel }
     */
    createImportFieldset: function() {
        var me = this;
        me.dropZone = Ext.create('Shopware.app.FileUpload', {
            requestURL: '{url controller="ThemeImportExport" action="import"}',
            padding: 0,
            checkType: false,
            maxAmount: 1,
            showInput: true,
            checkAmount: true,
            enablePreviewImage: false,
            dropZoneText: "Drop a theme configuration to import",
            height: 110,
            fileField: 'theme',
            fileInputConfig: {
                fieldLabel: 'theme configuration',
                buttonText: 'Select',
                labelStyle:'font-weight: 700',
                labelWidth:125,
                allowBlank:true,
                width: 390,

                buttonConfig: {
                    cls: 'secondary small',
                    iconCls: 'settings--theme-manager'
                }
            },
        });
        return Ext.create('Ext.form.FieldSet', {
            title: 'Import',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [
                me.dropZone
            ]
        });
    }

});
//{/block}