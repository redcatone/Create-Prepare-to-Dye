// priority: -1
let recipeIdNumber = 0
let allIds = []
let recipeIdSuffix = "pack"
function getUniqueName(recipe) {
    let results =
        recipe['results'] ? recipe['results'][0] :
            recipe['result'] ? recipe['result'] :
                recipe['output'] ? recipe['output'] : 'output_field_not_found'
    // results = (results + "").replaceAll("'", '');
    results = (results + "").replaceAll(" ", '');
    let name = recipe.type + "/" + results.split(':')[1]
    name = name.split("'")[0]
    if (allIds.includes(name)) {
        let id = 0
        while (allIds.includes(name + "/" + id)) {
            id++
        }
        name = (name + "") + "/" + id
    }
    allIds.push(name)
    console.log(name);
    return name + "/" + recipeIdSuffix
}
onEvent('recipes', event => {
    modpackRecipes.forEach(recipe => {
        console.log(recipe);
        event.custom(recipe).id = getUniqueName(recipe)
    });
})

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
