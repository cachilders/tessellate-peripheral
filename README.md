Successfully transpiled for the Onion Omega 2 and Omega 2 + with

`GOOS=linux GOARCH=mipsle go build -o tessellate main.go`

And synced to devices with

`rsync -P -a ~/desktop/tessellate root@omega-XXXX.local:/root`

Start with ./tessellate