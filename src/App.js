import React, { useEffect, useState } from "react";
import GameOptionsComp from "./components/GameOptionsComp";
import TowerComp from "./components/TowerComp";
import WinMessageComp from "./components/WinMessageComp";
import Tower from "./utils/Tower";
import deepCopy from "./helpers/deepCopy";
import "./App.css";

const App = () => {
  //Contar el numero de movimientos
  const [moveCount, setMoveCount] = useState(0);
  //El disco que se está movimiendo
  const [dragTile, setDragTile] = useState();
  //Los discos para la torre principal
  const [disks, setDisks] = useState(3);

  //Los discos de cada torre (1, 2, 3)
  const [tiles, setTiles] = useState([]);
  const [tilesTwo, setTilesTwo] = useState([]);
  const [tilesThree, setTilesThree] = useState([]);

  //Las 3 torres (columnas)
  const [towerOne, setTowerOne] = useState(new Tower(disks));
  const [towerTwo, setTowerTwo] = useState(new Tower(disks));
  const [towerThree, setTowerThree] = useState(new Tower(disks));

  const towers = {
    1: {
      tower: towerOne,
    },
    2: {
      tower: towerTwo,
    },
    3: {
      tower: towerThree,
    },
  };

  useEffect(() => {
    //Resetear las torres
    console.log('reset')
    
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disks]);

  //Actualizar todos los discos de las torres
  //Esta actualización se hará con cada movimiento de las torres
  useEffect(() => {
    console.log("toweOne", towerOne)
    setTiles(towerOne?.traverse());
  }, [towerOne]);

  useEffect(() => {
    console.log("towerTwo", towerTwo)

    setTilesTwo(towerTwo?.traverse());
  }, [towerTwo]);

  useEffect(() => {
    console.log("toweThree", towerThree)
    setTilesThree(towerThree?.traverse());
  }, [towerThree]);

  const reset = () => {
    const tempTower = deepCopy(towerOne)
    const tempTowerTwo = deepCopy(towerTwo)
    const tempTowerThree = deepCopy(towerThree)
    

    if (!towerOne.isEmpty()) tempTower.deletStacks(disks)


    for (let i = disks; i > 0; i--) {
      tempTower.add(i)
    }
    setMoveCount(0)
    setTowerOne(tempTower)
    setTowerTwo(tempTowerTwo?.deletStacks(disks))
    setTowerThree(tempTowerThree?.deletStacks(disks))
    //COMPLETAR
  };

  const updateAmountDisks = (value) => {
    console.log(value, ' value')
    if (value < 3) return 

    if (value < disks) setDisks(prev => prev--)

    setDisks(value)
  }

  const handleDrag = (e, tile, id) => {
    //Funcion que se lanza cada vez que movemos un disco que se encuentra en la parte superior de una torre
    const dragTileTop = { tile, towerId: id };
    console.log("si entro: ", towers[id].tower.top.value, " tile: ", dragTileTop.tile)
    console.log(towerOne)
    console.log('towerTwo ', towerTwo, ' tileTwo: ', tilesTwo)
    if (towers[id].tower.top.value === dragTileTop.tile.value) {
      console.log("entro al if ")
      e.dataTransfer.setData("text", e.target.id);
      setDragTile(dragTileTop);
    } else {
      e.preventDefault();
    }
  };

  const handleDrop = (e) => {
    //Funcion que se lanza cada vez que un disco se deja en una nueva torre 
    const dropColumn = e.currentTarget.id; //ID de la columna de destino
    let source = towers[dragTile.towerId].tower; //Torre de origen
    let destination = towers[dropColumn].tower; //Torre de destino
    // comprobamos si el 
    const goodMove = source.moveTopTo(destination); //Mover el disco desde la torre de origen al destino
    if(goodMove){ //Si es un movimiento valido -> incrementar los movimientos
      e.preventDefault();
      const tempGoodMove = deepCopy(goodMove)
      const tempDestination = deepCopy(destination)
      const data = e.dataTransfer.getData("text");
      
      console.log('data ', data, ' goodMove ', goodMove)

      if (+dropColumn === 1) setTowerOne(tempDestination)

      if (+dropColumn === 2) setTowerTwo(tempDestination)

      if (+dropColumn === 3) setTowerThree(tempDestination)
      
      if (+dragTile.towerId === 1) setTowerOne(tempGoodMove)
      
      if (+dragTile.towerId === 2) setTowerTwo(tempGoodMove)
  
      if (+dragTile.towerId === 3) setTowerThree(tempGoodMove)
          

      // e.target.appendChild(document.getElementById(data));
      setMoveCount((prevState) => prevState + 1); //Actualizar los movimientos
    }
  };

  const solve = () => {
    //COMPLETAR

    const {o, a, d} = towerOne.moveDisks(disks, towerOne, towerTwo, towerThree)
    const tempTowerOne = deepCopy(o)
    const tempTowerThree = deepCopy(d)
    setTowerOne(tempTowerOne)
    setTowerThree(tempTowerThree)
    console.log(o, a, d)
  };
  let winCondition = false
  if (towerThree.size === towerThree.maxSize) winCondition = true 

  return (
    <>
      <div className="container">
        <GameOptionsComp amount={disks} reset={reset} solve={solve} updateAmountDisks={updateAmountDisks} />
        <div className="content">
          <TowerComp
            id={1}
            disks={tiles}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={2}
            disks={tilesTwo}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={3}
            disks={tilesThree}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        </div>
        {winCondition && (
          <WinMessageComp moveCount={moveCount}/>
        )}
        Movimientos: {moveCount}
      </div>
    </>
  );
};

export default App;
