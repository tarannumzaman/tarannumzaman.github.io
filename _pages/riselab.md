---
layout: archive
title: "Reliable and Intelligent Software Engineering Lab (Rise Lab)"
permalink: /riselab/
author_profile: true
---

{% include base_path %}

## Overview

{% if site.data.lab.intro %}
{{ site.data.lab.intro | markdownify }}
{% endif %}

## Members

{% for member in site.data.lab.members %}
<div style="display: flex; align-items: center; margin-bottom: 1.5em;">
  <img src="{{ member.imageUrl }}" alt="{{ member.name }}" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 1em; object-fit: cover;">
  <div style="flex: 1;">
    <strong>{{ member.name }}</strong>
    {% if member.description %}
    <br><span style="font-size: 0.9em;">{{ member.description }}</span>
    {% endif %}
    <br><span style="color: #666; font-size: 0.9em;">{{ member.role }}</span>
  </div>
</div>
{% endfor %}

## Ongoing Projects

{% for project in site.data.lab.projects %}
<div style="margin-bottom: 2em;">
  <h3 style="color: #494e52; margin-bottom: 0.5em;">{{ project.name }}</h3>
  {% if project.description %}
  <p style="color: #5f6368; line-height: 1.6;">{{ project.description }}</p>
  {% endif %}
  {% if project.link %}
  <p><a href="{{ project.link }}" style="color: #1a73e8; text-decoration: none;">Learn more</a></p>
  {% endif %}
</div>
{% endfor %}

## Publications

<div id="scholar-publications" data-author-id="144422095" data-year-filter="2025-">
  <div class="scholar-loading">
    <i class="fa fa-spinner fa-spin"></i>
    Loading publications from Semantic Scholar...
  </div>
</div>

<link rel="stylesheet" href="{{ base_path }}/assets/css/publication.css">
<script src="{{ base_path }}/assets/js/scholar-fetch.js"></script>

---

*Interested in joining the Rise Lab? We are looking for self-motivated Ph.D. students with experience in Natural Language Processing, Large Language Models, Data Mining, and Program Analysis. Please contact 
Professor Tarannum Shaila Zaman*
