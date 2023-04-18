<div style="display: flex; justify-content: left; align-items: center;"><img src="https://articles.pokebattler.com/wp-content/uploads/2018/08/pokedex-kanto-1.jpg" style="zoom: 10%"><h1 style="zoom: 110%; padding-left: 20px">A REST API Based Pokédex</h1> </div>

**About:** A REST based API serving as a Pokédex for PokémonGo using JSON Sever.

## **Requirements:**

**This project requires:**

* **Docker Desktop is installed on your machine**

## Contents

* `Dockerfile` : Used to deploy the JSON server, expose port `80` and configure the **data** and **index** page.

  * ```
    FROM clue/json-server
    EXPOSE 80
    ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/data.json /data/
    ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/routes.json /data/routes/
    ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/index.html /data/public/
    ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/main.js /data/public/
    ADD https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/Pokemon-Json-Server/main/style.css data/public/
    ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes", "/data/routes/routes.json","--port", "80"]
    # ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes","--port", "80"] #Use this option if you do not want to use custom routing
    ```
* `index.html` - Serves as an index page for the server.
* `style.css` - css style for the index page.
* `main.js`- javascript for main the index page
* `routes.json` - Defines the routing of the REST API.
* `data.json` - PokémonGo data represented in JSON format: It contains a **list** of `pokemon` represented as objects with various attributes.
  **See below for an example.**

  ```
  {
     "pokemon":[
        {
           "id":1,
           "num":"001",
           "name":"Bulbasaur",
           "img":"http://www.serebii.net/pokemongo/pokemon/001.png",
           "type":[
              "Grass",
              "Poison"
           ],
           "height":"0.71 m",
           "weight":"6.9 kg",
           "candy":"Bulbasaur Candy",
           "candy_count":25,
           "egg":"2 km",
           "spawn_chance":0.69,
           "avg_spawns":69,
           "spawn_time":"20:00",
           "multipliers":[
              1.58
           ],
           "weaknesses":[
              "Fire",
              "Ice",
              "Flying",
              "Psychic"
           ],
           "next_evolution":[
              {
                 "num":"002",
                 "name":"Ivysaur"
              },
              {
                 "num":"003",
                 "name":"Venusaur"
              }
           ]
        }
     ]
  }
  ```

  **Example: ** Bulbasuar

  ![](http://www.serebii.net/pokemongo/pokemon/001.png) **Pokédex Entry** : 1,
  **Name** : Bulbasaur,
  **Type** : Grass and Poison

## Build and Deployment

**To ****build** the **image**, ensure that docker is running and open up your terminal and run the following command:

```
docker build -t pokedex:json-server .
```

**Then to ****delpoy** the **container** run the following command:

```
docker run --name pokedex -p 80:80 pokedex:json-server 
```

**Upon success you should see output in your terminal windows like this...**

```
  \{^_^}/ hi!

  Loading /data/db.json
  Done

  Resources
  http://localhost:80/pokemon

  Home
  http://localhost:80

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

## HTTP Methods

**The Pokédex supports the following HTTP Methods**

`GET`, `POST`, `PUSH`, `PATCH`,  `UPDATE` , `DELETE` and `OPTIONS` HTTP methods.

## Usage

**The following showcases some of the functionality of the Pokédex.**

### URL Queries

**Some examples of URL based queries include:**

#### Full Text Search

**?q=**: Full text search

* **Any pokemon object that contains the following string `Mew`**: `http://localhost/pokemon?Mew` will return the pokemon Mew and Mewtwo.
* **Any pokemon object that contains the following string `Ice`**`http://localhost/pokemon?q=Ice` will return the who's type and weakness containing ICE.

#### Search an Attribute

**?`<attribute>`=** search for something in a specific attribute that is equal to the value

* **Search based on Id**: `http://localhost/pokemon?id=151` will return the pokemon Mew
* **Search based on Type**: `http://localhost/pokemon?Type=Bug` will return whose type is exclusively `Bug`

#### Contains

**This can accept regular expressions too!**

**?`<attribute>`_like** search: Used to search if a specific field contains a specific value

* **Search for Pokemon based on their type**: `http://localhost/pokemon?type_like=Ghost` will return all pokemon where their `type` contains `ghost`
* **Search for pokemon based on a weakness** : `http://localhost/pokemon?weaknesses_like=Ghost`

#### Range

**?`<attribute>`_gte=**

* **Search for Pokemon based on their spawn chance of greater than or equal to 0.5**: `http://localhost/pokemon?spawn_chance_gte=0.5`

**?`<attribute>`_lte=**

* **Search for Pokemon based on their spawn chance of less than or equal to 0.1**: `http://localhost/pokemon?spawn_chance_lte=0.1`

#### Filtering

**You can use any combination of the above to filter your data using the concatenation operator **`&`.

* **Filter Pokemon based on an exclusive type `Bug`** and `spawn_chance` greater than or equal to 3: `http://localhost/pokemon?type=Bug&spawn_chance_gte=3`
* **Filter Pokemon based on an non exclusive type `Physic`** and `spawn_chance` greater than or equal to 3: `http://localhost/pokemon?type_like=Psychic&spawn_chance_gte=3`

## Built in Routes

**The following routes (endpoints) are preconfigured in the **`routes.json` file

* `/pokemon/` -
  * **Allows you to perform full-text search on all fields within the database.**
* `/pokemon/id/`**:id** -
  * **Enables you to search for a Pokémon by their ****id**
* `/pokemon/name/`**:name** -> /pokemon?name=:name
* **Enables you to Find a pokemon based on their ****name**
* `/pokemon/type/`**:type** -> /pokemon?type_like=:type
* **Enables you to Search for pokemon based on their ****type**

## Multiple Resource Endpoints

**Sometimes you may wish to have support multiple endpoints. For example **`pokemon` and `trainers`.

**To achieve this you will need to structure your **`data.json` as follows:

```
{
  "pokemon": [
    {
      "id": 1,
      "num": "001",
      "name": "Bulbasaur",
      "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
      "type": ["Grass", "Poison"],
      "height": "0.71 m",
      "weight": "6.9 kg",
      "weaknesses": ["Fire", "Ice", "Flying", "Psychic"],
      "next_evolution": [
        {
          "num": "002",
          "name": "Ivysaur"
        },
        {
          "num": "003",
          "name": "Venusaur"
        }
      ]
    },
    {
      "id": 2,
      "num": "002",
      "name": "Ivysaur",
      "img": "http://www.serebii.net/pokemongo/pokemon/002.png",
      "type": ["Grass", "Poison"],
      "height": "0.99 m",
      "weight": "13.0 kg",
      "weaknesses": ["Fire", "Ice", "Flying", "Psychic"],
      "prev_evolution": [
        {
          "num": "001",
          "name": "Bulbasaur"
        }
      ],
      "next_evolution": [
        {
          "num": "003",
          "name": "Venusaur"
        }
      ]
    },
    {
      "id": 3,
      "num": "003",
      "name": "Venusaur",
      "img": "http://www.serebii.net/pokemongo/pokemon/003.png",
      "type": ["Grass", "Poison"],
      "height": "2.01 m",
      "weight": "100.0 kg",
      "weaknesses": ["Fire", "Ice", "Flying", "Psychic"],
      "prev_evolution": [
        {
          "num": "001",
          "name": "Bulbasaur"
        },
        {
          "num": "002",
          "name": "Ivysaur"
        }
      ]
    }
  ],
  "trainers": [
    {
        "id" : "001",
        "name": "Dan",
        "route": "4"
    },
    {
        "id" : "002",
        "name": "Harley",
        "route": "3"
    }
  ]
}
```

Here we have a single object containing two named lists for `pokemon` and  `Trainer`

## Further Reading

**JSON Server Documentation: JSON Server Documentation: **[link](https://github.com/typicode/json-server)
