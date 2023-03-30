# This is a justfile (https://github.com/casey/just)
# Good cheatsheet (https://cheatography.com/linux-china/cheat-sheets/justfile/)

# project dir
project := "minimal"
	
# where to sync ./build
syncDest := "rud.is:~/rud.is/w/" + project + "/"

# default recipe to display help information
default:
  @just --list

# install/update miniserve
install-miniserve:
  cargo install miniserve

# serve project from ./build (requires miniserve)
bserve:
	miniserve \
		--header "Cache-Control: no-cache; max-age=1" \
		--header "Cross-Origin-Embedder-Policy: require-corp" \
		--header "Cross-Origin-Opener-Policy: same-origin" \
		--header "Cross-Origin-Resource-Policy: cross-origin" \
		--index index.html \
		build

# serve project (requires miniserve)
serve:
	miniserve \
		--header "Cache-Control: no-cache; max-age=1" \
		--header "Cross-Origin-Embedder-Policy: require-corp" \
		--header "Cross-Origin-Opener-Policy: same-origin" \
		--header "Cross-Origin-Resource-Policy: cross-origin" \
		--index index.html \
		.

# open a browser to ^^ (macOS Chrome Beta)
browse:
	open -a "Google Chrome Beta"  http://localhost:8080/

# sync to server
rsync:
  rsync -avp ./build/ {{syncDest}}

# be environmentally conscious
rollup:
	rm -rf build/
	npx rollup --config
