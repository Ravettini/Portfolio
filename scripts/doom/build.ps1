param([string]$EngineRoot, [string]$EmsdkRoot, [string]$CmakeBin, [string]$NinjaBin, [string]$BuildRoot)
$ErrorActionPreference = 'Continue'
$env:PATH = "$CmakeBin;$NinjaBin;$EmsdkRoot;$EmsdkRoot/upstream/emscripten;" + $env:PATH
& "$EmsdkRoot/upstream/emscripten/emcmake.bat" cmake -S $EngineRoot -B $BuildRoot -G Ninja '-DCMAKE_POLICY_VERSION_MINIMUM=3.5' -DCMAKE_BUILD_TYPE=Release '-DCMAKE_EXECUTABLE_SUFFIX=.js' -DENABLE_SDL2_MIXER=ON -DENABLE_SDL2_NET=OFF '-DCMAKE_EXE_LINKER_FLAGS=-g2 -sALLOW_MEMORY_GROWTH=1 -sASYNCIFY=0 -sSTACK_SIZE=5242880 -sDYNAMIC_EXECUTION=0 -sEXPORT_KEEPALIVE=1'
if ($LASTEXITCODE) { exit $LASTEXITCODE }
cmake --build $BuildRoot --target chocolate-doom --parallel 6
exit $LASTEXITCODE

