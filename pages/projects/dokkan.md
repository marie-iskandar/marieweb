---
title: Dokkan
category: projects
---
**Dokkan** is a template language and static site generators, and it was used to build this very site.
Obviously it would have made much more sense to use one of the myriad other excellent and well-tested static site generators or template languages already out there in the world,
but in my defense I'm stupid and vain. Dokkan is not yet in a state where I'd be comfortable releasing it (the current implementation is more of a proof-of-concept than anything; I do not consider it "safe" to use and the code has a lot of room for improvement), but I still want to show everyone my disgusting little child.

Here's the template used to render the "Dreams" page (as of the time of this writing).

```
@import main::"template.dokkan"

@def DreamSummary($title: string, $date: string, $href: string) = article.card {
  h3 {
    a[$href] @if($href) { $title }
    $title @unless($href)
  }
  time[datetime=$date] { $date }
  @yield
}

@def LongDream($path: string) = li {
  @def InnerDream($title: string, $date: string, $slug: string) =
    DreamSummary($title, $date, $"{$path}.html") > p > $slug
  InnerDream(@pageargs($"{$path}.md"))
}

@def ShortDream($path: string) = li {
  @def InnerDream($title: string, $date: string) =
    DreamSummary($title, $date, "") > @contents($"{$path}.md")
  InnerDream(@pageargs($"{$path}.md"))
}

@def Dreams() = main::Main("dreams", "Dreams") {
  @yield

  h3 { "2026" }
  ul.dreams {
    LongDream("dreams/20260619")
    LongDream("dreams/20260525")
    ShortDream("dreams/20260426")
    LongDream("dreams/20260315")
  }
}
```
* General document structure is very [Emmet](https://emmet.io/) / [Pug](https://pugjs.org/)-inspired.
* `@def` defines functions. They nest and can access variables from their enclosing scope. Function parameters are the only way to introduce new variables.
* `@yield` is replaced with the children passed to the function, which are enclosed in `{ }`, or following `>` as a shorthand for one direct child. In the case of a "top-level" template, the `@def` is called with its arguments from a Markdown's Frontmatter, with its rendered contents as the children. 
* `@pageargs` calls a `@def` using the values from the Frontmatter of the given Markdown file. As a language construct, it's pretty gross, but it works for my specific case, so bah. You can't mix-and-match passing positional arguments and passing `@pageargs`.
* `@contents` shoves in the contents of a Markdown file.
* Eventually I would like the type system to enforce that valid HTML is produced. It does not currently do this, or really exist at all.
* There are no looping or globbing constructs yet. Planning to do that at some point since manually listing everything in `ul.dreams` violates my aesthetics.
* Dokkan is written in C# because I was too lazy to write it in Rust or C++.