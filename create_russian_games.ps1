# PowerShell script to create Russian versions of game files

$baseDir = "C:\Users\X\Documents\GitHub\partygames"
$gamesDir = "$baseDir\games"
$ruDir = "$baseDir\ru\games"

# Ensure ru/games directory exists
if (!(Test-Path $ruDir)) {
    New-Item -ItemType Directory -Path $ruDir | Out-Null
}

# Get all game directories
$gameDirs = Get-ChildItem -Path $gamesDir -Directory | Where-Object { $_.Name -ne "games" }

# List of games to process
$games = @(
    @{ dir = "beernumber"; htmlName = "beernumber.html"; jsName = "beernumber.js" },
    @{ dir = "BottleMatchGame"; htmlName = "BottleMatchGame.html"; jsName = "BottleMatchGame.js" },
    @{ dir = "charades"; htmlName = "charades.html"; jsName = "charades.js" },
    @{ dir = "charades2"; htmlName = "charades2.html"; jsName = "charades2.js" },
    @{ dir = "findthespy"; htmlName = "findthespy.html"; jsName = "findthespy.js" },
    @{ dir = "hedbanzgame"; htmlName = "hedbanzgame.html"; jsName = "hedbanzgame.js" },
    @{ dir = "KingsCup"; htmlName = "KingsCup.html"; jsName = "KingsCup.js" },
    @{ dir = "lastshot"; htmlName = "lastshot.html"; jsName = "lastshot.js" },
    @{ dir = "liarsdice"; htmlName = "liarsdice.html"; jsName = "liarsdice.js" },
    @{ dir = "mafia"; htmlName = "mafia.html"; jsName = "mafia.js" },
    @{ dir = "magic8ball"; htmlName = "magic8ball.html"; jsName = "magic8ball.js" },
    @{ dir = "NeverHaveIEver"; htmlName = "NeverHaveIEver.html"; jsName = "NeverHaveIEver.js" },
    @{ dir = "numberguess"; htmlName = "numberguess.html"; jsName = "numberguess.js" },
    @{ dir = "sexdice"; htmlName = "sexdice.html"; jsName = "sexdice.js" },
    @{ dir = "TruthorDare"; htmlName = "TruthOrDare.html"; jsName = "TruthOrDare.js" },
    @{ dir = "undercover"; htmlName = "undercover.html"; jsName = "undercover.js" },
    @{ dir = "WhoIsMostLikely"; htmlName = "WhoIsMostLikely.html"; jsName = "WhoIsMostLikely.js" },
    @{ dir = "witchspoison"; htmlName = "witchspoison.html"; jsName = "witchspoison.js" },
    @{ dir = "WouldYouRather"; htmlName = "WouldYouRather.html"; jsName = "WouldYouRather.js" }
)

Write-Host "Starting Russian game files creation..."

foreach ($game in $games) {
    $gameDir = $game.dir
    $htmlFile = $game.htmlName
    $jsFile = $game.jsName

    $sourcePath = "$gamesDir\$gameDir"
    $destPath = "$ruDir\$gameDir"

    if (Test-Path $sourcePath) {
        # Create destination directory
        if (!(Test-Path $destPath)) {
            New-Item -ItemType Directory -Path $destPath | Out-Null
        }

        # Copy CSS and image files
        Get-ChildItem -Path $sourcePath -File | Where-Object { $_.Extension -in @(".css", ".png", ".jpg", ".jpeg", ".svg", ".gif") } | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination "$destPath\" -Force
        }

        Write-Host "Created directory structure for $gameDir"
    } else {
        Write-Host "Warning: Game directory not found: $sourcePath"
    }
}

Write-Host "Directories and static files created. HTML/JS files need to be created separately."
