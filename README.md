This node RESTful API will help secure the data of Meter for Uber users. This node server will take an AES256 encrypted trip and store in a Mongo database. It will also retrieve trips and send encrypted trips back to the client who can decrypt it with the key. Note this hasn't gone into production yet, but will shortly with a different key of course.

https://itunes.apple.com/us/app/meter-for-uber-and-lyft/id931234419?mt=8

https://play.google.com/store/apps/details?id=osacky.ridemeter&hl=en

To install node and mongodb:
```
brew install node
brew install mongodb
```


install node app dependencies:

`npm install`

start mongodb database:

`mongod --dbpath mongo/`

open new terminal

`node app.js`

to post a new trip to database such as 
```
{
	"deviceID" : "01C0D668-E4E2-4D20-9740-D140F185A20B",
	"meters" : 500.0836483595173,
	"startDate" : "1459882062.966937",
	"locations" : [
		{
			"lat" : 38.94537451058795,
			"lon" : -76.86708674575956
		}
	],
	"endDate" : "1459882401.951473"
}
```
first encypt using AES256 encryption and key 9D8A25F94ECF7A256BC3959F5BFE57FB (iOS and Android clients will do this):
```
e583f457dae2742e9b245e307f7900c024933e5d78277ca40f4965f0ad86289f12b244e22b7dfdf0da7c4f52ccdbaefbe06a67dd17de60faf9ca9c1899bdd0dc4f7d89afffd0e2c6e36717f69748ce9acf2cdd55c6a895575662e5fbe456837e23cdd303a25c87abd58d72ad8a2f63754e5893f2c3df6be7c3aca9a6cde0ce6e841013d6f855cf6c7079a0b0ddfe16c175250aece8d0b78c3c76fdb75634f4e61235b48c1f774800cd14fcc227b697718b694ad4fb0db5589b7d0f73da4a63d4fab4eb76aba781fda1e5a2ddd248b2af
```


Test POST localhost:3000/trip with encrypted trip as the body

```
POST /trip HTTP/1.1
Host: localhost:3000
Cache-Control: no-cache

e583f457dae2742e9b245e307f7900c024933e5d78277ca40f4965f0ad86289f12b244e22b7dfdf0da7c4f52ccdbaefbe06a67dd17de60faf9ca9c1899bdd0dc4f7d89afffd0e2c6e36717f69748ce9acf2cdd55c6a895575662e5fbe456837e23cdd303a25c87abd58d72ad8a2f63754e5893f2c3df6be7c3aca9a6cde0ce6e841013d6f855cf6c7079a0b0ddfe16c175250aece8d0b78c3c76fdb75634f4e61235b48c1f774800cd14fcc227b697718b694ad4fb0db5589b7d0f73da4a63d4fab4eb76aba781fda1e5a2ddd248b2af
```

Test GET localhost:3000/trips to receive all posted encrypted trips which returns:
```
9147d8a2f9fa6371dc209985dde988d034793dd79bf8d2d0f2b8ccf8b78295e64c28e02ff28b03ff6655dab180883e71561dbb01d14227a903666aabbbecdb78c322ef1dcc0715fd7c718de6411a7d7114a8951ce16492812b9a2e87516c4d000111415f58970713a0ea9773e9663a9d1ec216242c5320b28ad41529297220ece8168b7b84a60835e28343023b01ef9e1a325ff08ea386a0be311fbcbf3cc914f5283c7c331509f6b3ac705fc250493a91450e490dbaac7a31b318e7d38f425532615c86b589e8e5aa18024d965640beb04ed424e6934cea47cb4499f44c4ea620751f83789adc7a3908d97075979a142c6276589372397d5602832a3f471da056733b4424ce21b5dfc52eaf18963da48f902bbebd870733033c8ac68469a385e4605f9bcc1ce5a0bd2941b96b73fb4ff9bf1623c081a9b8f5e22ac89c4b121b8d2542680887283165522ad7419c727f5b892ba5874296178d1ec9678e4c138a10fb90fe466c7d980d6698f71065f742e1d52335b4ccd5ea2aadd4e3615521ad0fc11d7138f92ad036c632421be45e1bf3ce533e8852706c5209dc752f777f80f05c77eef80cbe6e808397c04564b6b365f78759d4d02d0301e07c6582a47e71ae3b79bc8de9729adb5fb543665874c9880fd1f4a42eff759187193cf6a270bb29cd7b4897655b5505f013ed691f70b07d6ccaacfe10b0ab5dccd50fcb325800be3704f4472421a9294b84f03fdf14975f2873c9b88356c043dae10b8143e9671f9ce94ab3c070ee86d2a4e3a6d4e8249d67bde05ef7b16c26fa21cf4686221037822ad58d4a54d579c7f85c750987beb8f81208b41375063b67e8df688229f6582f5b25504c6aee0e0e0febae63de5d26c4eb1dabde57d040365a38a9944f2daad7fb236ced5a65fe4b6583eadfafe0dacb417c7bf36a43cd6f6dc992f7f32edd6c685e3d30344b01f4ca16791f2fde54f03cd0997a7ddc9df4b129e9e9214200b16611141661e3ae6680ca0692c3e23855b77a14efcb42798b38c56ac3428778b9ee411d0417f0a86534d08c5f41e51bd7a8fb10ae708db7a0ae8f0c2feee6c176e93e1f6c7f22448ba11f38870b8822c86a08cb224684aff470c688e41d34ffd605f451d134b8b505c0bec37e79b4a1b96917c70479db1905a82382ce5c9fda72d332911775b6e2355c0c8dadb6d22f82fbe81542ee4eaaf099d1a7a1d8c8250223c13ddc27f1a1be9dcdf0c4525a0eac61e29bc06b9cf9516a8aaa5c2a70aeefd11d59ea39a28d955c0c10824589d4f81d8c5de735a66f58dcf1f9405a8bfa7869b568d299bb69bf6af1fb093d064353145ebcf8c0a3bf3096d236317ba406f36f3c65078b7c41835882f689f3c46eaf17355db795add0fb32562b84d2944fa377a737a0be670aa124bb1ff3f2a26e64da0a1483ebf0f41ddd3c0e00e69daf5f8eed03636b781815cb6ea7e0599190322faa54ebe3a6786706cc10169488b46ff7871b600d0344c1234ddcab30a72f65fc8e29352c615217e094057e667b92440d3403e3eca1df589b4924d952e85894c2960686cd484b957043d81b358a296ad98b6ea59cf0e45e0ff4426677866b4722f7d2dd6efca44931388ebbb3bdd1cd22316e853fe35489b2b23d5f1edaf96edf731d7ea9d0d8ade5dd5b4f0aaa54a0fccc7762e8cdb55697c3014a369e962907be4e471b0763948f51523a5c74f9eddcb6be255086fbd0d2ea0b2fc8beefa3fc8f414bb9ffcaabd4da4d36fb3e3a1bf3bcc52d1fe2e5cd997a7e2a851be8ac770fbcfa070efc36bc77aa62fc380b523bc058dd216b18d781cefe03752a7f9c4784e4e8c16ae097746fb053b4310dc1c1eab21e39827fc12de4c8b169be5b949298fce91e833d86f6aa82f73fde23dc88be6ed34161a278d811b55bce83aaa45b778a5612a9b7186348435ab38bdf6c59578a5ce655818aba1631d675d99fe23208251074084c8583ad5b32bad8de9ab4700f43ccb71a1df9b5dba9d2b246422fded62a753c90bc4bb57d7369e8a106257cea54baddfa5448e9a43dfd4c796d0c07a5d8e7876a5addcfffcfa1ff0cc988e7c1cb8440be90ae0f021cfe05ac3f2c563ef8ba0b5084d8c517ce254feb82cb53982ca86e850ab8ecad0b1b7271aa69c0af5827d39816e343ccb8d554de353f1146e81a0d071198649790ce867a614f8b9672019527d19457712f1f358ec05b5cfaa88f3ba02be0c23b17c6d4fc32efab8692f2f3313e238b8e611bbb4c995b7ac0b72758d1410aed8bbad45876d9cce3fb15dfe85c21cb723e78e909caec6bae42c805f1e8d56a303ccf2575
```
decrypt client side to generate:
```
[
  {
    "_id": "570409a22207aeed34d62753",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "57361f3c9dbc55aa5a802321"
      }
    ]
  },
  {
    "_id": "57361fd5c09e23b55a933d37",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "57361fd5c09e23b55a933d38"
      }
    ]
  },
  {
    "_id": "5736214a9d92e0e65aa986d0",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "5736214a9d92e0e65aa986d1"
      }
    ]
  },
  {
    "_id": "5736218f9d92e0e65aa986d2",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "5736218f9d92e0e65aa986d3"
      }
    ]
  },
  {
    "_id": "573625a4ed2acc715b48c4ec",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "573625a4ed2acc715b48c4ed"
      }
    ]
  },
  {
    "_id": "5736283b68ff02d75b0da2af",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "5736283b68ff02d75b0da2b0"
      }
    ]
  },
  {
    "_id": "5736286568ff02d75b0da2b1",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "5736286568ff02d75b0da2b2"
      }
    ]
  },
  {
    "_id": "57362e9268ff02d75b0da2b3",
    "meters": 500.0836483595173,
    "startDate": "1459882062.966937",
    "endDate": "1459882401.951473",
    "__v": 0,
    "locations": [
      {
        "lat": 38.94537451058795,
        "_id": "57362e9268ff02d75b0da2b4"
      }
    ]
  }
]
```


