import Head from 'next/head'
import { useState, useEffect, Component} from "react";
import * as Realm from "realm-web";
import Calc from "../Calculator";

//Get data from Database
export default function Home() {
  const [items, setItems] = useState([])
  
  useEffect(async() => {
    const REALM_APP_ID = "checkout_calculator-qawwr";
    const app = new Realm.App({id: REALM_APP_ID});
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allItems = await user.functions.getItems();
      setItems(allItems);
    } catch (error){
      console.error(error);
    }
  }, [])

  let formatItems = items.slice();
  let finalItems = Array();
  for (let i = 0; i < formatItems.length; i++){
    finalItems.push([formatItems[i].name, formatItems[i].price])
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          {items && <Calc items={finalItems}></Calc>}
      </main>
    </div>
  )
}



