import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {Button} from './components/Save-button'
import './styles/drink-div.css'
// import Box from './components/Box'

class App extends Component {
  constructor(props){
      super(props)

      this.state = {
        cocktailNameInput: '',
        cocktailArray: [],
        favDrinksArray: [],
        cocktailsfrombackend: [],
        faveDiv: "favDiv",
        randomDrinkDiv: [],
        newCocktails:[]
      }
      this.getCocktailByName = this.getCocktailByName.bind(this);
      this.saveForLater = this.saveForLater.bind(this);
      this.getFavCocktails = this.getFavCocktails.bind(this);
      this.feelingRandom = this.feelingRandom.bind(this);
      this.deleteFromFavs = this.deleteFromFavs.bind(this);
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCocktailByName(){
        console.log('hello')
        axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.cocktailNameInput}`).then((cocktails) => {

           this.setState({
           cocktailArray: cocktails.data['drinks']
          })
        })
          .catch((err) => {
          console.log("err", err)
    })
  }
//////////////////////////////////////////
      getUserInput(eventVal){
         this.setState({
          cocktailNameInput: eventVal })
  }
/////////////////////////////////////////

      feelingRandom(){
        axios.get('http://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => {
          this.setState({
            randomDrinkDiv: response.data
          })
        })
        .catch((err) => {
          console.log('err', err)
        })
      }

      filterType(i){
        // axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputstateofclickedbox}`).then((cocktails) => {
          
      }

      saveForLater(i){
        console.log('cocktail Array position', this.state.cocktailsfrombackend)

        axios.post('http://www.localhost:3535/api/cocktail', this.state.cocktailArray[i])
        .then((resp) => {
           this.setState({
              cocktailsfrombackend: resp.data
        })
        
      })
      .catch((err) => {
        console.log('err', err)
      })
  console.log('state', this.state.cocktailsfrombackend)
    }
    /////////////////////////////////////////////////////////
    getFavCocktails(){
      
      axios.get('http://www.localhost:3535/api/cocktail')
      .then((resp) => {
        this.setState({
          favDrinksArray: resp.data
        })
        console.log(resp.data)
      })
    }
////////////////////////////////////////////////////////////////
deleteFromFavs(id){
  console.log('hello')
  axios.delete(`http://www.localhost:3535/api/cocktail/${id}`)
  .then((resp) => {
    this.setState({
      cocktailsfrombackend: resp.data
    })
  })
  .catch((err) => {
    console.log('err', err)
  })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	render() {



      const diplayDrinks = this.state.cocktailArray.map((elem, index) => {
       
        return (
          <div className="drink_div">
              <div>{elem.strDrink}</div>
              <div className="img_div"> 
              <img src={'http://' + elem.strDrinkThumb}/> </div>
              <div className="instructions">{elem.strInstructions}</div>
              <Button saveForLater={this.saveForLater} getFavCocktails={this.getFavCocktails} index={index}/>
          </div>  
          )
      })

      const displayFavoritedrinks = this.state.cocktailsfrombackend.map((elem, index) => {
        return (
          
          <div className={this.state.faveDiv}>
              <div>{elem.strDrink}</div>
              <button id={elem.id} onClick={() => {this.deleteFromFavs(elem.id)}}>delete</button>
              <div className="img_div"> 
              <img src={'http://' + elem.strDrinkThumb}/> </div>
              <div>{elem.strInstructions}</div>
          </div>
        ) 
      })

      const displayRandomDrinks = this.state.randomDrinkDiv.map((elem) => {
       return ( 
        <div className="random-drink-div">
          <div>{elem.strDrink}</div>
          <div className="img_div"> 
          <img src={'http://' + elem.strDrinkThumb}/> </div>
          <div>{elem.strInstructions}</div>
        </div>
       )
      })
      



				return (
						<div className="App">
             <header className="bar top">
                      <div className="title"><h1>drink up!</h1></div>
                      <button className="random-button" onClick={this.feelingRandom}>Random Drink</button>
                    </header> 

								<div className="main-body">
                   
                   
                          <div className="central-content">

                          <div className="big_rotating_images"><img src="http://www.thecocktaildb.com/images/media/drink/athdk71504886286.jpg"/></div>
                            <form>
                              <input type="text" onChange={(e) => this.getUserInput(e.target.value)} placeholder="search cocktails by name"/>
                                 
                            </form>
                            <button onClick={this.getCocktailByName}>drink up!</button>
                            
                           <div> {diplayDrinks} </div>
                           <h2>myfavorite drinks:</h2>
                        
                           

                              {/* <button onClick={this.getFavCocktails}> get my drinks</button> */}
                              {displayFavoritedrinks}

                          </div>
                          
                       <aside className="left-aside">{displayRandomDrinks}</aside>
                       <aside className="right-aside"></aside>
                       <section className="box-container">
                       
                              <div className="box tequila">
                                {/* <Box/> */}
                              </div>
                              
                              <div className="box vodka">
                                {/* <Box/> */}
                              </div>
                              
                              <div className="box rum">
                                {/* <Box/> */}
                              </div>
                              {/* */}
                              <div className="box margaritas">
                                {/* <Box/> */}
                              </div>
                                    
                              <div className="box gin">
                                {/* <Box/> */}
                              </div>
                              {/*  */}
                              <div className="box classic">
                                {/* <Box/> */}
                              </div>
                               
                          </section>
                    <footer className="bar bottom"></footer>
                </div>
				
								
						</div>
				);
		}
}

export default App;
