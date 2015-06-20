(function ($) {

    // shorten references to variables. this is better for uglification
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    // declare the custom input widget by extenting the very base kendo widget
    var GridStateManager = Widget.extend({
        _uid: null,
        _combobox: null,
        _clearButton: null,
        _deleteButton: null,
        _saveButton: null,
        _gridId: null,
        _selectedStateId: null,

        // define the init function which is called by the base widget
        init: function (element, options) {

            // cache a reference to this
            var that = this;

            // make the base call to initialize this widget
            Widget.fn.init.call(this, element, options);

            // actually create the UI elements
            that._create();
        },

        // the options object contains anything that will be passed in when the widget
        // is actually used
        options: {
            name: "GridStateManager",
            comboBoxWidth: 480,
            gridId: ""
        },

        // this function creates each of the UI elements and appends them to the element
        // that was selected out of the DOM for this widget
        _create: function () {

            // cache a reference to this
            var that = this;

            that._uid = new Date().getTime();
            that._gridId = "#" + that.options.gridId;

            $(that.element).append(kendo.format("<input id='gridStateComboBox_{0}' />", that._uid));


            // Create the combobox.
            that._combobox = $(kendo.format("#gridStateComboBox_{0}", that._uid)).kendoComboBox({
                dataTextField: "Name",
                dataValueField: "State",
                dataSource: that.options.comboBoxDataSource,
                filter: "contains",
                suggest: true,
                placeholder: "Start typing to search or set the name to save the current grid state",
                select: function (e) {
                    var dataItem = this.dataItem(e.item.index());
                    var state = dataItem.State;
                    var grid = $(that._gridId).data("kendoGrid");
                    grid.setOptions(JSON.parse(state));
                    that._setSelectedStateId(dataItem.Id);
                }
            }).data("kendoComboBox");

            that._combobox.wrapper.width(that.options.comboBoxWidth);

            // create the add/update button
            $(that.element).append(kendo.format("&nbsp;<button  type='button' id='gridStateSaveBtn_{0}'>Add</button>", that._uid));
            that._saveButton = $(kendo.format("#gridStateSaveBtn_{0}", that._uid)).kendoButton({
                click: function (e) {
                    var grid = $(that._gridId).data("kendoGrid");
                    var state = kendo.stringify(grid.getOptions());
                    var name = that._combobox.text();
                    if (name != "") {
                        if (that._selectedStateId == null) {
                            var newState = that._combobox.dataSource.add({ Name: name, State: state });
                            that._combobox.dataSource.sync();
                            that._setSelectedStateId(newState.Id);
                        } else {
                            var dataItem = that._combobox.dataSource.get(that._selectedStateId);
                            dataItem.set("Name", name);
                            dataItem.set("State", state);
                            that._combobox.dataSource.sync();
                        }
                    }
                }
            });

            // create the delete button
            $(that.element).append(kendo.format("&nbsp;<button type='button' id='gridStateDeleteBtn_{0}'>Delete</button>", that._uid));
            that._deleteButton = $(kendo.format("#gridStateDeleteBtn_{0}", that._uid)).kendoButton({
                enable: false,
                click: function (e) {
                    that._combobox.text("");
                    that._combobox.selectedIndex = (-1);
                    var dataItem = that._combobox.dataSource.get(that._selectedStateId);
                    that._combobox.dataSource.remove(dataItem);
                    that._combobox.dataSource.sync();
                    that._setSelectedStateId(null);
                }
            });

            // create the clear button
            $(that.element).append(kendo.format("&nbsp;<button type='button' id='gridStateClearBtn_{0}'>Clear</button>", that._uid));
            that._clearButton = $(kendo.format("#gridStateClearBtn_{0}", that._uid)).kendoButton({
                enable: false,
                click: function (e) {
                    that._combobox.text("");
                    that._combobox.selectedIndex = (-1);
                    that._setSelectedStateId(null);

                    // To avoid depend on instantation order to get the initial state to reset, directly reset sorting, filtering and grouping
                    var grid = $(that._gridId).data("kendoGrid");
                    grid.dataSource.sort({});
                    grid.dataSource.filter({});
                    if (grid.dataSource.group().length > 0)
                        grid.dataSource.group([]);
                    grid.dataSource.read();
                }
            });
        },

        _setSelectedStateId: function (id) {
            this._selectedStateId = id;
            this._deleteButton.data("kendoButton").enable(id != null);
            this._clearButton.data("kendoButton").enable(id != null);
            if (id != null) {
                this._saveButton.text("Update");
            } else {
                this._saveButton.text("Add");
            }
        }

    });

    // add the widget to the ui namespace so it's available
    ui.plugin(GridStateManager);

})(jQuery);