{
	"targets": [{
		"target_name": "node_viser",
		"sources": [
			"addon/src/service.cpp"
		],
		"include_dirs": [
			"addon/dep_include"
		],
		"link_settings": {
			"libraries": ["-L../addon/lib", "-ltenncor_io"]
		},
		"conditions": [
			[
				"OS!='win'",
				{
					"cflags+": [ "-std=c++14" ],
					"cflags_c+": [ "-std=c++14" ],
					"cflags_cc+": [ "-std=c++14" ]
				}
			],
			[
				"OS=='mac'",
				{
					"xcode_settings": {
						"OTHER_CPLUSPLUSFLAGS" : [ "-std=c++14", "-stdlib=libc++" ],
						"OTHER_LDFLAGS": [ "-stdlib=libc++" ],
						"MACOSX_DEPLOYMENT_TARGET": "10.7"
					}
    			}
			],
    	]
	}]
}