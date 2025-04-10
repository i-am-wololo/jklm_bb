{
	inputs = {
		nixpkgs.url = "nixpkgs";
	};

	outputs = {self, nixpkgs, ...}@inputs : {
		devShells.x86_64-linux.default = let
			pkgs =  import nixpkgs {system = "x86_64-linux";};
		in
			pkgs.mkShell {
				packages = with pkgs; [
					nodejs

			];
		};

	};
}
