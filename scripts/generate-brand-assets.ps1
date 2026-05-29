Add-Type -AssemblyName System.Drawing

$publicDir = Join-Path $PSScriptRoot "..\\public"

$brand = @{
  Primary = [System.Drawing.ColorTranslator]::FromHtml("#0f3d91")
  Secondary = [System.Drawing.ColorTranslator]::FromHtml("#14b8a6")
  Accent = [System.Drawing.ColorTranslator]::FromHtml("#f59e0b")
  Ink = [System.Drawing.ColorTranslator]::FromHtml("#0f172a")
  Canvas = [System.Drawing.ColorTranslator]::FromHtml("#f8fafc")
  White = [System.Drawing.Color]::White
  Muted = [System.Drawing.ColorTranslator]::FromHtml("#64748b")
}

function New-RoundedRectPath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $Radius * 2
  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function Draw-BrandIcon {
  param(
    [System.Drawing.Graphics]$Graphics,
    [int]$Size
  )

  $Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $Graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $Graphics.Clear($brand.Canvas)

  $padding = [int]($Size * 0.08)
  $panelSize = $Size - ($padding * 2)
  $radius = [int]($Size * 0.18)
  $path = New-RoundedRectPath -X $padding -Y $padding -Width $panelSize -Height $panelSize -Radius $radius
  $panelBrush = New-Object System.Drawing.SolidBrush($brand.Primary)
  $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(24, 15, 23, 42))
  $Graphics.FillPath($shadowBrush, (New-RoundedRectPath -X $padding -Y ($padding + [int]($Size * 0.025)) -Width $panelSize -Height $panelSize -Radius $radius))
  $Graphics.FillPath($panelBrush, $path)

  $orbPen = New-Object System.Drawing.Pen($brand.White, [float]($Size * 0.055))
  $routePen = New-Object System.Drawing.Pen($brand.Accent, [float]($Size * 0.06))
  $routePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $routePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $routePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $tealBrush = New-Object System.Drawing.SolidBrush($brand.Secondary)
  $goldBrush = New-Object System.Drawing.SolidBrush($brand.Accent)
  $whiteBrush = New-Object System.Drawing.SolidBrush($brand.White)

  $cx = $Size / 2
  $cy = $Size / 2
  $globe = [float]($Size * 0.29)
  $Graphics.DrawEllipse($orbPen, $cx - $globe, $cy - $globe, $globe * 2, $globe * 2)
  $Graphics.DrawArc($orbPen, $cx - ($globe * 0.95), $cy - ($globe * 0.55), $globe * 1.9, $globe * 1.1, 0, 180)
  $Graphics.DrawArc($orbPen, $cx - ($globe * 0.95), $cy - ($globe * 0.05), $globe * 1.9, $globe * 1.1, 180, 180)
  $Graphics.DrawArc($orbPen, $cx - ($globe * 0.45), $cy - ($globe * 1.0), $globe * 0.9, $globe * 2.0, 90, 180)
  $Graphics.DrawArc($orbPen, $cx - ($globe * 0.8), $cy - ($globe * 1.0), $globe * 1.6, $globe * 2.0, 90, 180)

  $curve = New-Object System.Drawing.Drawing2D.GraphicsPath
  $points = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new([float]($cx - $globe * 0.95), [float]($cy + $globe * 0.28)),
    [System.Drawing.PointF]::new([float]($cx - $globe * 0.3), [float]($cy + $globe * 0.6)),
    [System.Drawing.PointF]::new([float]($cx + $globe * 0.12), [float]($cy - $globe * 0.18)),
    [System.Drawing.PointF]::new([float]($cx + $globe * 0.82), [float]($cy - $globe * 0.62))
  )
  $curve.AddCurve($points, 0.5)
  $Graphics.DrawPath($routePen, $curve)

  $startSize = [float]($Size * 0.1)
  $endSize = [float]($Size * 0.12)
  $Graphics.FillEllipse($tealBrush, $points[0].X - ($startSize / 2), $points[0].Y - ($startSize / 2), $startSize, $startSize)
  $Graphics.FillEllipse($goldBrush, $points[3].X - ($endSize / 2), $points[3].Y - ($endSize / 2), $endSize, $endSize)
  $Graphics.FillEllipse($whiteBrush, $points[3].X - ($endSize * 0.28), $points[3].Y - ($endSize * 0.28), $endSize * 0.56, $endSize * 0.56)

  $triangle = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new([float]($cx + $globe * 0.22), [float]($cy - $globe * 1.0)),
    [System.Drawing.PointF]::new([float]($cx + $globe * 0.55), [float]($cy - $globe * 0.82)),
    [System.Drawing.PointF]::new([float]($cx + $globe * 0.3), [float]($cy - $globe * 0.55))
  )
  $Graphics.FillPolygon($tealBrush, $triangle)

  $curve.Dispose()
  $path.Dispose()
  $panelBrush.Dispose()
  $shadowBrush.Dispose()
  $orbPen.Dispose()
  $routePen.Dispose()
  $tealBrush.Dispose()
  $goldBrush.Dispose()
  $whiteBrush.Dispose()
}

function Save-IconPng {
  param(
    [int]$Size,
    [string]$Name
  )

  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  Draw-BrandIcon -Graphics $graphics -Size $Size
  $bitmap.Save((Join-Path $publicDir $Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

function Save-OgImage {
  $width = 1200
  $height = 630
  $bitmap = New-Object System.Drawing.Bitmap($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear($brand.Canvas)

  $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    [System.Drawing.Rectangle]::new(0, 0, $width, $height),
    [System.Drawing.ColorTranslator]::FromHtml("#eff6ff"),
    [System.Drawing.ColorTranslator]::FromHtml("#ecfeff"),
    25
  )
  $graphics.FillRectangle($bgBrush, 0, 0, $width, $height)

  $panelPath = New-RoundedRectPath -X 64 -Y 54 -Width 1072 -Height 522 -Radius 34
  $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 255, 255, 255))
  $panelPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(28, 15, 61, 145), 2)
  $graphics.FillPath($panelBrush, $panelPath)
  $graphics.DrawPath($panelPen, $panelPath)

  $logoBitmap = New-Object System.Drawing.Bitmap(156, 156)
  $logoGraphics = [System.Drawing.Graphics]::FromImage($logoBitmap)
  Draw-BrandIcon -Graphics $logoGraphics -Size 156
  $graphics.DrawImage($logoBitmap, 104, 110, 156, 156)

  $titleBrush = New-Object System.Drawing.SolidBrush($brand.Ink)
  $mutedBrush = New-Object System.Drawing.SolidBrush($brand.Muted)
  $accentBrush = New-Object System.Drawing.SolidBrush($brand.Accent)
  $tagBrush = New-Object System.Drawing.SolidBrush($brand.Primary)
  $titleFont = New-Object System.Drawing.Font("Segoe UI Semibold", 42, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $brandFont = New-Object System.Drawing.Font("Segoe UI Semibold", 34, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $bodyFont = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $pillFont = New-Object System.Drawing.Font("Segoe UI Semibold", 20, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

  $graphics.DrawString("VisaPath", $brandFont, $titleBrush, 290, 108)
  $graphics.DrawString("Visa requirements,", $titleFont, $titleBrush, 104, 300)
  $graphics.DrawString("clearer.", $titleFont, $accentBrush, 104, 354)
  $graphics.DrawString(
    "Search visa rules, compare processing times, and find embassy contacts in one fast reference site.",
    $bodyFont,
    $mutedBrush,
    [System.Drawing.RectangleF]::new(104, 434, 660, 92)
  )

  $pillPath = New-RoundedRectPath -X 812 -Y 152 -Width 240 -Height 58 -Radius 18
  $pillBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(22, 20, 184, 166))
  $graphics.FillPath($pillBrush, $pillPath)
  $graphics.DrawString("Official-source led", $pillFont, $tagBrush, 842, 168)

  $metricsFont = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $metricsTitle = New-Object System.Drawing.Font("Segoe UI Semibold", 24, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $graphics.DrawString("Compare", $metricsTitle, $titleBrush, 812, 276)
  $graphics.DrawString("Processing times", $metricsFont, $mutedBrush, 812, 314)
  $graphics.DrawString("Embassy contacts", $metricsFont, $mutedBrush, 812, 346)
  $graphics.DrawString("Document checklists", $metricsFont, $mutedBrush, 812, 378)

  $bitmap.Save((Join-Path $publicDir "og-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)

  $metricsFont.Dispose()
  $metricsTitle.Dispose()
  $pillBrush.Dispose()
  $pillPath.Dispose()
  $titleFont.Dispose()
  $brandFont.Dispose()
  $bodyFont.Dispose()
  $pillFont.Dispose()
  $titleBrush.Dispose()
  $mutedBrush.Dispose()
  $accentBrush.Dispose()
  $tagBrush.Dispose()
  $logoGraphics.Dispose()
  $logoBitmap.Dispose()
  $panelBrush.Dispose()
  $panelPen.Dispose()
  $panelPath.Dispose()
  $bgBrush.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

function Save-FaviconIco {
  $source = Join-Path $publicDir "favicon-32x32.png"
  $bytes = [System.IO.File]::ReadAllBytes($source)
  $target = Join-Path $publicDir "favicon.ico"
  $writer = New-Object System.IO.BinaryWriter([System.IO.File]::Open($target, [System.IO.FileMode]::Create))
  $writer.Write([UInt16]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]1)
  $writer.Write([byte]32)
  $writer.Write([byte]32)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]$bytes.Length)
  $writer.Write([UInt32]22)
  $writer.Write($bytes)
  $writer.Flush()
  $writer.Dispose()
}

Save-IconPng -Size 16 -Name "favicon-16x16.png"
Save-IconPng -Size 32 -Name "favicon-32x32.png"
Save-IconPng -Size 180 -Name "apple-touch-icon.png"
Save-IconPng -Size 192 -Name "android-chrome-192x192.png"
Save-IconPng -Size 512 -Name "android-chrome-512x512.png"
Save-OgImage
Save-FaviconIco
