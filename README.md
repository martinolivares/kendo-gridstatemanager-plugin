# kendo-gridstatemanager-plugin #
A kendo plugin to manage kendo grid states (filtering/sorting/grouping)

## Basic Usage ##
This plugin allow manage (add, update, remove) a collection of kendo grid settings like filters, sorting and grouping (grid states in kendo jargon). So, you could create, re-use and share grid "views".

![Grid State Manager in Action](https://raw.githubusercontent.com/martinolivares/kendo-gridstatemanager-plugin/master/images/kendoGridStateManager.png)


## Configuration Steps ##

1. Add a kendo grid
2. Add a placeholder element to configure the grid state manager

		  <div id="gridstate"></div>

3. Configure the grid state manager
    
         $("#gridstate").kendoGridStateManager({
    			gridId: "grid",
    			comboBoxDataSource: [] // Configure the datasource that will persist changes on server});

## Options ##

> gridId

Specifies the element id of the grid to manage.

> comboBoxDataSource

Specifies the datasource for grid states. Usually a kendo.data.DataSource that execute server side CRUD operations.


## Futures ##
- Auto-load last state.
- Allow manage state permissions (ie: shared, private, etc). 
- In a new plugin extend grid filters to support variables like 'Last 7 days', 'Me' (to filter by current user), etc.   
