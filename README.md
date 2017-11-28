Successfully transpiled for the Onion Omega 2, Omega 2+, and LinkIt Smart 7688 with

`GOOS=linux GOARCH=mipsle go build -o tessellate main.go`

And synced to devices with

`scp ~/path/to/tessellate root@<DEVICE>.local:/root`

Start with ./tessellate