/*
Name: Armando Villa
Date: 11/27/2024
Description: Javascript file that generates a multiplication table to be 
used for the HTML file from user inputs.

*/

// Initial inputs for the multiplication table
var p1 = 1;
var p2 = 2;
var p3 = 1;
var p4 = 2;

// Minimum and Maximum amounts for table
min_amount = -50;
max_amount = 50;

//Current Working Tab
var currentTab = 1;

$(document).ready(function() {
    $(function(){

        // Slider Setup
        $("#min_col_slider, #max_col_slider, #min_row_slider, #max_row_slider").slider(
        {
            min: min_amount,
            max: max_amount,
            step: 1,
            value: 0
        });
    
        // Getting Slider Values from Input Values
        // Min Column
        $("#min_col_slider").on( "slidestop", function(event, ui)
        {
            $("#min_col").val($("#min_col_slider").slider("option", "value"));
        });

        // Max Column
        $("#max_col_slider").on( "slidestop", function(event, ui)
        {
            $("#max_col").val($("#max_col_slider").slider("option", "value"));
        });

        // Min Row
        $("#min_row_slider").on( "slidestop", function(event, ui)
        {
            $("#min_row").val($("#min_row_slider").slider("option", "value"));
        });

        // Max Row
        $("#max_row_slider").on( "slidestop", function(event, ui)
        {
            $("#max_row").val($("#max_row_slider").slider("option", "value"));
        });

        // Event Listeners for changing any sliders to remake the table
        $("#min_col_slider, #max_col_slider, #min_row_slider, #max_row_slider").on("slidestop", function(event,ui)
        {
            newTableCreation();
        });

        //Tabs Setup
        $("#myTabs").tabs(
        {
            active:1,
            selected:1
        });
    });
});

// Event listener for the Submit Button
document.getElementById("submitButton").addEventListener("click", function()
{
    newTableCreation();
});

// Event listener for the input boxes to reset the table
var elements = document.querySelectorAll("#min_col", "#max_col", "#min_row", "#max_row");
elements.forEach(element => {
    element.addEventListener("change", () =>
    {
        newTableCreation();
    });
});

// Function for creating a new table
function newTableCreation()
{
    // Depreciated event because the table kept disappearing otherwise
    event.preventDefault();

    // Get the inputs from the user and generate an array from their values
    var p1 = parseInt(document.getElementById("min_col").value);
    var p2 = parseInt(document.getElementById("max_col").value);
    var p3 = parseInt(document.getElementById("min_row").value);
    var p4 = parseInt(document.getElementById("max_row").value);

    // Update the slider value based off input value
    $("#min_col_slider").slider("value", p1);
    $("#max_col_slider").slider("value", p2);
    $("#min_row_slider").slider("value", p3);
    $("#max_row_slider").slider("value", p4);

    // Stores the array generated from submitNumbers
    var finalArray = submitNumbers(p3, p4, p1, p2);

    // Change the array into an HTML table
    if(finalArray != null)
    {
        var finalTable = arrayToTable(finalArray);
        
        // Implant the array into the HTML code;
        document.getElementById("myTables").innerHTML = '';
        document.getElementById("myTables").append(finalTable);

        // Create new Tab
        var newTab = document.createElement('li');
        newTab.innerHTML = "<a href = \"#myTable\">Min Col: " + p1 + 
        ", Max Col: " + p2 + ", Min Row: " + p3 + ", Max Row: " + p4 + "</a>\n";
        currentTab++;
        $("ul").append(newTab);
        $("#myTabs").tabs("refresh");
    }
}


// Function that takes the inputted numbers and creates a
// 2d array with the correctly multiplicated values.
function submitNumbers(min_col, max_col, min_row, max_row)
{

    // Empty inputs
    if(isNan(min_col) || isNan(max_col) || isNan(min_row) || isNan(max_row))
    {
        return null;
    }
    // Minimum size is greater than maximum
    if(min_col > max_col || min_row > max_row)
    {
        return null;
    }
    // Check if they're numbers
    if(!isInt(min_col) || !isInt(max_col) || !isInt(min_row) || !isInt(max_row))
    {
        return null;
    }
    // Minumum or Maximum values exceeded
    if(min_col < min_amount || max_col > max_amount || min_row < min_amount || max_row > max_amount)
    {
        return null;
    }
    // Initial columns and rows being set to 0
    if(max_col == 0 || max_row == 0)
    {
        return null;
    }

    // Array creation and variables
    let tableArray = [];
    tableArray[0] = [];
    tableArray[0][0] = 'X';
    var array_col_size = max_col - min_col + 1;
    var array_row_size = max_row - min_row + 1;

    // Creating the starter columns and rows
    // Inserts the arrays inside the initial tableArray elements
    for(var i=0; i < array_col_size; i++)
    {
        tableArray[i+1] = [];
        tableArray[i+1][0] = i + min_col;
    }
    for(var i=0; i < array_row_size; i++)
    {
        tableArray[0][i+1] = i + min_row;
    }

    // Double for loop that fills in the array with the
    // multiplication table values 
    for(var i=1; i <= array_col_size; i++)
    {
        for(var j=1; j <= array_row_size; j++)
        {
            tableArray[i][j] = tableArray[i][0] * tableArray[0][j];
        }
    }

    //console.log(tableArray);

    return tableArray;
}

// Generates a table using the values from the array
function arrayToTable(TwoDArray)
{
    let table = document.createElement('table');

    for(let row of TwoDArray)
    {
        let tableRow = table.insertRow();
        for(let cell of row)
        {
            let tableCell = tableRow.insertCell();
            tableCell.textContent = cell;
        }
    }
    return table;
}

// Checks if the value is an int
function isInt(num)
{
    return Number.isInteger(num);
}

// Checks if the value is a NaN
function isNan(num)
{
    return Number.isNaN(num);
}